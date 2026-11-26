import type { Lesson, LessonCheck } from '../types';

export interface CheckState extends LessonCheck {
  ok: boolean;
}

export interface LessonValidation {
  ok: boolean;
  checks: CheckState[];
  issues: string[];
}

type Mode = 'html' | 'js' | 'python' | 'sql' | 'c';

/** Убираем комментарии, чтобы нельзя было «пройти» задание одним комментарием */
const stripComments = (code: string, mode: Mode): string => {
  if (mode === 'html') return code.replace(/<!--[\s\S]*?-->/g, '');
  if (mode === 'sql') return code.replace(/--.*$/gm, '');
  if (mode === 'python') return code.replace(/#.*$/gm, '');
  if (mode === 'js') return code.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:'"`])\/\/.*$/gm, '$1');
  return code.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1');
};

/** Проверка парности скобок с учётом строк */
const balanceIssues = (code: string): string[] => {
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];
  let quote: string | null = null;

  for (let i = 0; i < code.length; i += 1) {
    const ch = code[i];
    if (quote) {
      if (ch === '\\') {
        i += 1;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.pop() !== pairs[ch]) {
        return ['Скобки расставлены неверно: нарушена пара (), [] или {}.'];
      }
    }
  }

  if (quote) return ['Не закрыта кавычка в коде.'];
  if (stack.length > 0) return ['Не все скобки закрыты: проверь пары (), [] и {}.'];
  return [];
};

/** Отступы в Python: после строки с «:» должен идти блок с отступом */
const pythonIssues = (code: string): string[] => {
  const lines = code.split('\n');
  const issues: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;

    const indent = line.match(/^[ \t]*/)?.[0] ?? '';
    if (indent.includes(' ') && indent.includes('\t')) {
      issues.push(`Смешаны пробелы и табуляция в отступах (строка ${i + 1}).`);
    }

    const prev = lines[i - 1];
    if (prev && prev.trim().endsWith(':')) {
      const prevIndent = prev.match(/^[ \t]*/)?.[0] ?? '';
      if (indent.length <= prevIndent.length) {
        issues.push(`После строки с «:» нужен отступ (строка ${i + 1}).`);
      }
    }
  }

  return issues;
};

/** Синтаксис JavaScript проверяем компиляцией без выполнения */
const jsSyntaxIssues = (code: string): string[] => {
  try {
    // eslint-disable-next-line no-new, no-new-func
    new Function(code);
    return [];
  } catch (error) {
    const message = error instanceof Error ? error.message : 'неизвестная ошибка';
    return [`Синтаксическая ошибка JavaScript: ${message}`];
  }
};

const modeFor = (courseId: string): Mode => {
  if (courseId === 'basics') return 'html';
  if (courseId === 'python') return 'python';
  if (courseId === 'sql') return 'sql';
  if (courseId === 'nodejs' || courseId === 'typescript' || courseId === 'react') return 'js';
  return 'c';
};

/**
 * Проверка решения: пустой код, парность скобок, отступы Python,
 * синтаксис JS и структурные правила конкретного задания.
 * Без запуска чужого кода: JS только компилируется через new Function.
 */
export const validateLesson = (
  courseId: string,
  lesson: Lesson,
  code: string,
): LessonValidation => {
  const mode = modeFor(courseId);
  const clean = stripComments(code, mode);
  const issues: string[] = [];

  if (!clean.replace(/\s+/g, '')) {
    issues.push('Код пустой — напиши решение задания.');
  }

  issues.push(...balanceIssues(clean));

  if (courseId === 'python') issues.push(...pythonIssues(clean));
  if (courseId === 'nodejs') issues.push(...jsSyntaxIssues(clean));

  if (courseId === 'basics' && lesson.id === 'basics-6') {
    const script = clean.match(/<script[^>]*>([\s\S]*?)<\/script>/i)?.[1] ?? '';
    if (script.trim()) issues.push(...jsSyntaxIssues(script));
  }

  const checks = lesson.checks.map((check) => ({ ...check, ok: check.pattern.test(clean) }));
  for (const check of checks) {
    if (!check.ok) issues.push(check.message);
  }

  return { ok: issues.length === 0, checks, issues: [...new Set(issues)] };
};

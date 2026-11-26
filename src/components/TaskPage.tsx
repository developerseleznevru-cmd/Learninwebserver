import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, ListChecks, XCircle } from 'lucide-react';
import { validateLesson } from '../lib/validateLesson';
import type { Language, Lesson } from '../types';

interface TaskPageProps {
  course: Language;
  lesson: Lesson;
  /** Индекс урока в курсе (0-based) */
  index: number;
  /** Всего уроков в курсе */
  total: number;
  /** Урок уже пройден ранее */
  isCompleted: boolean;
  onBack: () => void;
  onComplete: () => void;
  /** Следующий урок, если он есть */
  onNext?: () => void;
}

/**
 * Страница задания: постановка, требования, редактор кода и автопроверка.
 * Проверка валидирует структуру кода: скобки, синтаксис и конструкции задания.
 */
export default function TaskPage({
  course,
  lesson,
  index,
  total,
  isCompleted,
  onBack,
  onComplete,
  onNext,
}: TaskPageProps) {
  const [code, setCode] = useState(lesson.starter);
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(isCompleted);
  const [hintOpen, setHintOpen] = useState(false);

  const validation = useMemo(
    () => validateLesson(course.id, lesson, code),
    [course.id, lesson, code],
  );

  // Escape возвращает к списку уроков
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  const handleCheck = () => {
    setChecked(true);
    // Результат показываем по последней проверке, а не по факту старого прогресса
    setPassed(validation.ok);
    if (validation.ok && !isCompleted) onComplete();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ '--glow-rgb': course.colorRGB } as CSSProperties}
      className="pt-8 pb-4"
      aria-labelledby="task-title"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" />
        К списку уроков
      </button>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide uppercase">
        <span style={{ color: course.color }}>{course.name}</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">
          Урок {index + 1} из {total}
        </span>
        {isCompleted && (
          <span className="flex items-center gap-1 rounded-full border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-[11px] text-lime-300">
            <CheckCircle2 className="h-3 w-3" /> Пройдено
          </span>
        )}
      </div>

      <h1 id="task-title" className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
        {lesson.title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{lesson.goal}</p>

      {/* ===== Требования ===== */}
      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <ListChecks className="h-4 w-4 text-cyan-300" />
          В коде должно быть
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {validation.checks.map((check) => {
            const ok = check.ok;
            return (
              <li
                key={check.label}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs ${
                  !checked
                    ? 'border-slate-800 bg-slate-950/50 text-slate-400'
                    : ok
                      ? 'border-lime-400/40 bg-lime-400/10 text-lime-300'
                      : 'border-rose-400/40 bg-rose-400/10 text-rose-300'
                }`}
              >
                {checked && (ok ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />)}
                {check.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ===== Редактор ===== */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
          <span className="font-mono text-xs text-slate-500">{lesson.id}.txt</span>
          <button
            type="button"
            onClick={() => setCode(lesson.starter)}
            className="text-xs text-slate-500 transition-colors hover:text-cyan-300"
          >
            Сбросить
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Код решения"
          className="min-h-[260px] w-full resize-y bg-slate-950/60 p-4 font-mono text-sm leading-relaxed text-slate-200 outline-none focus:bg-slate-950/80"
        />
      </div>

      {/* ===== Действия и обратная связь ===== */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCheck}
          className="neon-btn rounded-lg border px-5 py-2.5 text-sm font-semibold"
          style={{
            borderColor: `${course.color}80`,
            backgroundColor: `${course.color}14`,
            color: course.color,
            ['--glow-rgb' as string]: course.colorRGB,
          }}
        >
          Проверить
        </button>
        <button
          type="button"
          onClick={() => setHintOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-amber-400/50 hover:text-amber-300"
        >
          <Lightbulb className="h-4 w-4" />
          {hintOpen ? 'Скрыть подсказку' : 'Подсказка'}
        </button>
        <button
          type="button"
          onClick={() => setCode(lesson.solution)}
          className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
        >
          Показать решение
        </button>
      </div>

      {hintOpen && (
        <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/5 px-4 py-3 text-sm text-amber-200">
          {lesson.hint}
        </p>
      )}

      {checked && passed && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-lime-400/40 bg-lime-400/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold text-lime-300">
            <CheckCircle2 className="h-4 w-4" />
            Задание принято — урок засчитан.
          </p>
          <div className="flex gap-2">
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-1.5 rounded-lg border border-lime-400/50 bg-lime-400/10 px-4 py-2 text-sm font-semibold text-lime-300 transition-colors hover:bg-lime-400/20"
              >
                Следующий урок
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              К курсу
            </button>
          </div>
        </div>
      )}

      {checked && !passed && (
        <div className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/5 px-4 py-3 text-sm text-rose-200">
          <p className="flex items-center gap-2 font-semibold">
            <XCircle className="h-4 w-4" />
            Код не прошёл проверку — ошибок: {validation.issues.length}.
          </p>
          <ul className="mt-1.5 list-inside list-disc text-xs text-rose-200/80">
            {validation.issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
}

import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Lock, Play, Zap } from 'lucide-react';
import type { Language, Lesson } from '../types';
import LanguageIcon from './LanguageIcon';
import ProgressBar from './ProgressBar';

interface CoursePageProps {
  course: Language;
  /** Задания курса в порядке прохождения */
  lessons: Lesson[];
  /** Индексы пройденных уроков */
  completed: number[];
  onBack: () => void;
  /** Открыть задание урока */
  onOpenLesson: (index: number) => void;
}

/**
 * Страница курса: шапка с описанием, прогресс и список заданий.
 * Открывается по кнопке на карточке курса и заменяет каталог.
 */
export default function CoursePage({
  course,
  lessons,
  completed,
  onBack,
  onOpenLesson,
}: CoursePageProps) {
  const {
    name,
    description,
    color,
    colorRGB,
    level,
    progress,
    lessonsDone,
    lessonsTotal,
    xpReward,
  } = course;

  const hasLessons = lessons.length > 0;
  const isCompleted = hasLessons && lessonsDone >= lessonsTotal;
  const nextIndex = Math.min(lessonsDone, Math.max(lessons.length - 1, 0));

  // Открываем страницу с самого начала и закрываем по Escape
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ '--glow-rgb': colorRGB } as CSSProperties}
      className="pt-8 pb-4"
      aria-labelledby="course-title"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к каталогу
      </button>

      {/* ===== Шапка курса ===== */}
      <div className="neon-card relative mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: color }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border"
              style={{
                color,
                backgroundColor: `${color}1f`,
                borderColor: `${color}66`,
                boxShadow: `0 0 24px ${color}55`,
              }}
            >
              <LanguageIcon language={course} className="h-7 w-7" />
            </span>
            <div>
              <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-300 uppercase">
                {level}
              </span>
              <h1
                id="course-title"
                className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
              >
                {name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
            </div>
          </div>

          {/* Прогресс + действие */}
          <div className="w-full shrink-0 lg:w-72">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">
                {hasLessons ? `${lessonsDone}/${lessonsTotal} уроков` : 'Задания готовятся'}
              </span>
              {hasLessons && (
                <span className="font-semibold" style={{ color }}>
                  {progress}%
                </span>
              )}
            </div>
            {hasLessons && <ProgressBar value={progress} from={color} delay={0.15} className="mt-2" />}

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-fuchsia-300 [text-shadow:0_0_10px_rgba(189,0,255,0.55)]">
                <Zap className="h-4 w-4 text-fuchsia-400" /> +{xpReward} XP
              </span>
              <button
                type="button"
                onClick={() => onOpenLesson(nextIndex)}
                disabled={isCompleted || !hasLessons}
                className="neon-btn inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  borderColor: `${color}80`,
                  backgroundColor: `${color}14`,
                  color,
                  ['--glow-rgb' as string]: colorRGB,
                }}
              >
                {!hasLessons
                  ? 'Скоро'
                  : isCompleted
                    ? 'Курс пройден'
                    : lessonsDone === 0
                      ? 'Начать курс'
                      : 'Продолжить'}
                {hasLessons && !isCompleted && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Список заданий ===== */}
      {hasLessons ? (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-white">Задания курса</h2>
            <span className="text-xs text-slate-500">
              Пройдено {lessonsDone} из {lessonsTotal}
            </span>
          </div>

          <ol className="mt-4 space-y-2">
            {lessons.map((lesson, i) => {
            const isDone = completed.includes(i);
            const isUnlocked = i <= completed.length;
            const isCurrent = isUnlocked && !isDone;

            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onOpenLesson(i)}
                  disabled={!isUnlocked}
                  aria-label={`Урок ${i + 1}: ${lesson.title}${isDone ? ' — пройден' : isUnlocked ? ' — открыт' : ' — закрыт'}`}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                    isDone
                      ? 'border-lime-400/30 bg-lime-400/5 hover:bg-lime-400/10'
                      : isCurrent
                        ? 'border-cyan-400/40 bg-cyan-400/5 hover:bg-cyan-400/10'
                        : 'cursor-not-allowed border-slate-800 bg-slate-950/40'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      isDone
                        ? 'bg-lime-400/15 text-lime-300'
                        : isCurrent
                          ? 'bg-cyan-400/15 text-cyan-300'
                          : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4" />
                    ) : isUnlocked ? (
                      <Play className="h-3.5 w-3.5" />
                    ) : (
                      <Lock className="h-3.5 w-3.5" />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-medium ${
                        isUnlocked ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {i + 1}. {lesson.title}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {isDone ? 'Пройдено' : isUnlocked ? 'Открыто — можно приступить' : 'Откроется после предыдущего урока'}
                    </span>
                  </span>

                  {isUnlocked && <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />}
                </button>
              </li>
            );
          })}
          </ol>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-14 text-center">
          <Clock className="h-8 w-8 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Задания этого курса ещё готовятся</p>
          <p className="max-w-md text-sm text-slate-500">
            Описание уже есть, практика появится в ближайшем обновлении. А пока выбери курс с
            готовыми заданиями.
          </p>
        </div>
      )}
    </motion.section>
  );
}

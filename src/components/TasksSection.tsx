import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Lock, Play } from 'lucide-react';
import { lessonsByCourse } from '../data/lessons';
import type { Language } from '../types';
import LanguageIcon from './LanguageIcon';

interface TasksSectionProps {
  courses: Language[];
  /** Индексы пройденных уроков по курсам */
  completed: Record<string, number[]>;
  onOpenLesson: (courseId: string, index: number) => void;
}

/** Раздел «Задачи»: все задания тренажёра с доступностью по прогрессу */
export default function TasksSection({ courses, completed, onOpenLesson }: TasksSectionProps) {
  const withLessons = courses.filter((course) => (lessonsByCourse[course.id]?.length ?? 0) > 0);
  const totalTasks = withLessons.reduce((sum, c) => sum + (lessonsByCourse[c.id]?.length ?? 0), 0);
  const doneTasks = withLessons.reduce((sum, c) => sum + (completed[c.id]?.length ?? 0), 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pt-8 pb-4"
      aria-labelledby="tasks-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="tasks-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
            Задачи
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Все задания тренажёра в одном месте. Открыто то, что идёт сразу после пройденного урока.
          </p>
        </div>
        <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-1.5 text-xs font-semibold text-slate-400">
          Пройдено {doneTasks} из {totalTasks}
        </span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {withLessons.map((course) => {
          const lessons = lessonsByCourse[course.id] ?? [];
          const done = completed[course.id] ?? [];

          return (
            <article
              key={course.id}
              style={{ '--glow-rgb': course.colorRGB } as CSSProperties}
              className="neon-card rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md"
            >
              <header className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border"
                  style={{
                    color: course.color,
                    backgroundColor: `${course.color}1f`,
                    borderColor: `${course.color}66`,
                  }}
                >
                  <LanguageIcon language={course} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-base font-semibold text-white">
                    {course.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {done.length}/{lessons.length} заданий
                  </p>
                </div>
              </header>

              <ol className="mt-4 space-y-1.5">
                {lessons.map((lesson, i) => {
                  const isDone = done.includes(i);
                  const isUnlocked = i <= done.length;

                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => onOpenLesson(course.id, i)}
                        disabled={!isUnlocked}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                          isDone
                            ? 'text-lime-300 hover:bg-lime-400/5'
                            : isUnlocked
                              ? 'text-slate-200 hover:bg-cyan-400/5'
                              : 'cursor-not-allowed text-slate-600'
                        }`}
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center">
                          {isDone ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : isUnlocked ? (
                            <Play className="h-3.5 w-3.5" />
                          ) : (
                            <Lock className="h-3 w-3" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {i + 1}. {lesson.title}
                        </span>
                        {isUnlocked && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Flag } from 'lucide-react';
import type { Language } from '../types';
import LanguageIcon from './LanguageIcon';
import ProgressBar from './ProgressBar';

interface RoadmapSectionProps {
  courses: Language[];
  onOpenCourse: (id: string) => void;
}

/** Раздел «Дорожная карта»: порядок прохождения курсов и прогресс */
export default function RoadmapSection({ courses, onOpenCourse }: RoadmapSectionProps) {
  const available = courses.filter((course) => course.lessonsTotal > 0);
  const nextCourse = available.find((c) => c.progress < 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pt-8 pb-4"
      aria-labelledby="roadmap-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="roadmap-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
            Дорожная карта
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Пошаговый путь: от первой HTML-страницы до серверного кода. Иди по порядку — так проще.
          </p>
        </div>
        {nextCourse && (
          <span className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Flag className="h-4 w-4" />
            Следующий шаг: {nextCourse.name}
          </span>
        )}
      </div>

      <ol className="relative mt-6 space-y-3 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-slate-800">
        {available.map((course, i) => {
          const isDone = course.progress >= 100;
          const isNext = nextCourse?.id === course.id;
          const actionLabel = isDone ? 'Пройден' : course.progress > 0 ? 'Продолжить' : 'Начать';

          return (
            <li key={course.id} className="relative pl-10">
              <span
                className={`absolute top-5 left-0 grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${
                  isDone
                    ? 'border-lime-400/50 bg-lime-400/15 text-lime-300'
                    : isNext
                      ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-300 shadow-[0_0_16px_rgba(0,210,255,0.35)]'
                      : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </span>

              <div
                style={{ '--glow-rgb': course.colorRGB } as CSSProperties}
                className="neon-card rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border"
                    style={{
                      color: course.color,
                      backgroundColor: `${course.color}1f`,
                      borderColor: `${course.color}66`,
                    }}
                  >
                    <LanguageIcon language={course} className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-display text-base font-semibold text-white">
                      {course.name}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {course.level} · {course.lessonsDone}/{course.lessonsTotal} уроков
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenCourse(course.id)}
                    disabled={isDone}
                    className="neon-btn inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      borderColor: `${course.color}80`,
                      backgroundColor: `${course.color}14`,
                      color: course.color,
                      ['--glow-rgb' as string]: course.colorRGB,
                    }}
                  >
                    {actionLabel}
                    {!isDone && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="mt-3">
                  <ProgressBar value={course.progress} from={course.color} delay={0.1} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </motion.section>
  );
}

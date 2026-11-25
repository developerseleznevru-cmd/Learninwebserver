import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import type { Language } from '../types';
import ProgressBar from './ProgressBar';

interface LanguageCardProps {
  language: Language;
  /** Порядок появления при монтировании (для каскадной анимации) */
  index?: number;
}

/**
 * Карточка курса (HTML5, CSS3, JavaScript…).
 *
 * Неон реализован через CSS-переменную `--glow-rgb`:
 *  - класс .neon-card (index.css) при hover светится фирменным цветом;
 *  - framer-motion поднимает карточку на -4px при наведении.
 */
export default function LanguageCard({ language, index = 0 }: LanguageCardProps) {
  const {
    name,
    description,
    color,
    colorRGB,
    level,
    icon: Icon,
    progress,
    lessonsDone,
    lessonsTotal,
    xpReward,
  } = language;

  const isStarted = lessonsDone > 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ '--glow-rgb': colorRGB } as CSSProperties}
      className="neon-card group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md"
    >
      {/* Размытое цветовое пятно в углу — «аура» курса, ярче при hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ backgroundColor: color }}
      />

      {/* Иконка + бейджь сложности */}
      <div className="relative flex items-start justify-between gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-xl border"
          style={{
            color,
            backgroundColor: `${color}1f`,
            borderColor: `${color}66`,
            boxShadow: `0 0 20px ${color}55`,
          }}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-300 uppercase">
          {level}
        </span>
      </div>

      {/* Название и описание */}
      <h3 className="relative mt-4 font-display text-xl font-bold text-white">{name}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>

      {/* Прогресс курса */}
      <div className="relative mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {lessonsDone}/{lessonsTotal} уроков
          </span>
          <span className="font-semibold" style={{ color }}>
            {progress}%
          </span>
        </div>
        <ProgressBar value={progress} from={color} delay={0.15 + index * 0.08} />
      </div>

      {/* XP + кнопка действия */}
      <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-fuchsia-300 [text-shadow:0_0_10px_rgba(189,0,255,0.55)]">
          <Zap className="h-4 w-4 text-fuchsia-400" /> +{xpReward} XP
        </span>

        <button
          type="button"
          className="neon-btn inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold text-white"
          style={{
            borderColor: `${color}80`,
            backgroundColor: `${color}14`,
            color,
            ['--glow-rgb' as string]: colorRGB,
          }}
        >
          {isStarted ? 'Продолжить' : 'Начать курс'}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Sparkles, Trophy } from 'lucide-react';
import { achievements, dailyQuest } from '../data/mockData';
import ProgressBar from './ProgressBar';

/**
 * Сайдбар: задание дня (Daily Quest) + мини-достижения.
 * На мобильных уходит под сетку курсов.
 */
export default function DailyQuestSidebar() {
  const { title, hint, rewardXp, progress, total } = dailyQuest;
  const percent = Math.round((progress / total) * 100);

  return (
    <div className="space-y-5 lg:sticky lg:top-24">
      {/* ===== Задание дня ===== */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ '--glow-rgb': '189,0,255' } as CSSProperties}
        className="neon-card rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md"
        aria-labelledby="daily-quest-title"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300 [text-shadow:0_0_12px_rgba(189,0,255,0.55)]">
            <Sparkles className="h-4 w-4 text-fuchsia-400" /> Задание дня
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Сегодня
          </span>
        </div>

        <h3
          id="daily-quest-title"
          className="mt-4 font-display text-base leading-snug font-semibold text-white"
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-slate-400">
          {hint}{' '}
          <span className="font-semibold text-lime-300 [text-shadow:0_0_10px_rgba(0,255,136,0.5)]">
            +{rewardXp} XP
          </span>
        </p>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-slate-500">Прогресс</span>
          <span className="font-semibold text-fuchsia-300">
            {progress}/{total}
          </span>
        </div>
        <ProgressBar value={percent} from="#BD00FF" to="#00D2FF" delay={0.5} className="mt-2" />

        <button
          type="button"
          className="neon-btn mt-5 w-full rounded-xl border border-fuchsia-500/50 bg-fuchsia-500/10 px-4 py-2.5 text-sm font-semibold text-fuchsia-300 hover:bg-fuchsia-500/20"
          style={{ ['--glow-rgb' as string]: '189,0,255' }}
        >
          Продолжить задание
        </button>
      </motion.aside>

      {/* ===== Достижения ===== */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md"
        aria-labelledby="achievements-title"
      >
        <h3
          id="achievements-title"
          className="flex items-center gap-2 font-display text-sm font-semibold text-white"
        >
          <Trophy className="h-4 w-4 text-yellow-400 [filter:drop-shadow(0_0_6px_rgba(255,230,0,0.8))]" />
          Достижения
        </h3>

        <ul className="mt-4 space-y-2.5">
          {achievements.map((a) => (
            <li
              key={a.id}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                a.done
                  ? 'border-lime-400/30 bg-lime-400/5 text-lime-300'
                  : 'border-slate-800 bg-slate-950/40 text-slate-500'
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  a.done
                    ? 'bg-lime-400/15 text-lime-300 shadow-[0_0_10px_rgba(0,255,136,0.35)]'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                {a.done ? <Check className="h-3.5 w-3.5" /> : <Lock className="h-3 w-3" />}
              </span>
              {a.label}
            </li>
          ))}
        </ul>
      </motion.aside>
    </div>
  );
}

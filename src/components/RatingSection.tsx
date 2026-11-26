import { motion } from 'framer-motion';
import { Flame, Trophy, Zap } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { leaderboard } from '../data/mockData';

/** Раздел «Рейтинг»: таблица лидеров по опыту */
export default function RatingSection() {
  const { user } = useAuth();
  const rows = [...leaderboard].sort((a, b) => b.xp - a.xp);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pt-8 pb-4"
      aria-labelledby="rating-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="rating-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
            Рейтинг
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Лучшие ученики недели по накопленному опыту. Твой результат подсвечен.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3.5 py-1.5 text-xs font-semibold text-yellow-300">
          <Trophy className="h-4 w-4" />
          Топ недели
        </span>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-3 border-b border-slate-800 px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          <span>#</span>
          <span>Ученик</span>
          <span className="text-right">Опыт</span>
        </div>

        <ul>
          {rows.map((row, i) => {
            const isMe = user ? row.name === user.name : false;
            const rankStyle =
              i === 0
                ? 'text-yellow-300'
                : i === 1
                  ? 'text-slate-300'
                  : i === 2
                    ? 'text-amber-500'
                    : 'text-slate-500';

            return (
              <li
                key={row.name}
                className={`grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-800/60 px-4 py-3 last:border-b-0 ${
                  isMe ? 'bg-cyan-400/5' : ''
                }`}
              >
                <span className={`font-display text-sm font-bold ${rankStyle}`}>{i + 1}</span>

                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className={`truncate text-sm font-medium ${isMe ? 'text-cyan-200' : 'text-slate-200'}`}>
                      {row.name}
                    </span>
                    {isMe && (
                      <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-cyan-300 uppercase">
                        Вы
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 flex items-center gap-3 text-[11px] text-slate-500">
                    <span>Уровень {row.level}</span>
                    <span className="flex items-center gap-1 text-orange-300/80">
                      <Flame className="h-3 w-3" />
                      {row.streakDays}
                    </span>
                  </span>
                </span>

                <span className="flex items-center justify-end gap-1.5 text-sm font-semibold text-fuchsia-300 [text-shadow:0_0_10px_rgba(189,0,255,0.45)]">
                  <Zap className="h-3.5 w-3.5" />
                  {row.xp.toLocaleString('ru-RU')}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
}

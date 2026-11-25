import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Target, Zap } from 'lucide-react';
import { currentUser } from '../data/mockData';
import ProgressBar from './ProgressBar';

/**
 * Hero-секция: приветствие + мини-виджет дневного прогресса.
 * Адаптив: на десктопе две колонки, на мобильном — одна.
 */
export default function Hero() {
  const { name, dailyDone, dailyGoal, level, rank, streakDays } = currentUser;
  const percent = Math.round((dailyDone / dailyGoal) * 100);
  const left = dailyGoal - dailyDone;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid items-center gap-8 pt-10 pb-4 lg:grid-cols-[1.4fr_1fr] lg:pt-14"
    >
      {/* Приветствие */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 uppercase">
          <span className="blink-dot h-1.5 w-1.5 rounded-full bg-cyan-300 text-cyan-300" />
          Уровень {level} · {rank}
        </span>

        <h1 className="mt-5 font-display text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
          С возвращением,{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent [filter:drop-shadow(0_0_22px_rgba(0,210,255,0.35))]">
            {name.split(' ')[0]}
          </span>
          !<br className="hidden sm:block" /> Готов покорять код сегодня?
        </h1>

        <p className="mt-4 max-w-xl text-base text-slate-400">
          Твой ежедневный спринт ждёт: прокачай навыки, забери XP и продолжи стрик{' '}
          <span className="font-semibold text-orange-300">{streakDays} дней</span> без остановки.
        </p>

        {/* Быстрые метрики */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-300">
            <Flame className="h-4 w-4 text-orange-400" /> Стрик {streakDays} дней
          </span>
          <span className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-300">
            <Zap className="h-4 w-4 text-fuchsia-400" />{' '}
            {currentUser.xp.toLocaleString('ru-RU')} XP
          </span>
          <span className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-300">
            <Clock className="h-4 w-4 text-cyan-400" /> ~15 мин до цели
          </span>
        </div>
      </div>

      {/* Виджет дневного прогресса */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
        style={{ '--glow-rgb': '0,210,255' } as CSSProperties}
        className="neon-card rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(0,210,255,0.3)]">
              <Target className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold text-white">Дневная норма</h2>
              <p className="text-xs text-slate-500">Обнуляется в 00:00</p>
            </div>
          </div>
          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-xs font-semibold text-lime-300 [text-shadow:0_0_10px_rgba(0,255,136,0.5)]">
            +50 XP
          </span>
        </div>

        {/* Счётчик уроков */}
        <div className="mt-6 flex items-end gap-2">
          <span className="font-display text-4xl font-bold text-white">
            {dailyDone}
            <span className="text-slate-600">/{dailyGoal}</span>
          </span>
          <span className="pb-1.5 text-sm text-slate-400">уроков пройдено</span>
        </div>

        <ProgressBar
          value={percent}
          from="#00D2FF"
          to="#BD00FF"
          delay={0.35}
          className="mt-4 h-2.5"
        />

        <p className="mt-3 text-sm text-slate-400">
          {left > 0 ? (
            <>
              Осталось{' '}
              <span className="font-semibold text-cyan-300 [text-shadow:0_0_10px_rgba(0,210,255,0.6)]">
                {left} {left === 1 ? 'урок' : left < 5 ? 'урока' : 'уроков'}
              </span>{' '}
              до выполнения цели
            </>
          ) : (
            <span className="font-semibold text-lime-300">Цель выполнена — отличная работа! 🔥</span>
          )}
        </p>
      </motion.div>
    </motion.section>
  );
}

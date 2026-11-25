import { motion } from 'framer-motion';
import type { FilterId, FilterTab } from '../types';

interface FilterTabsProps {
  tabs: FilterTab[];
  active: FilterId;
  onChange: (id: FilterId) => void;
  /** Количество курсов в каждой вкладке (для бейджей-счётчиков) */
  counts: Record<string, number>;
}

/**
 * Вкладки-фильтры каталога.
 * Активная кнопка подсвечивается неоном (анимированный «пузырь» через layoutId).
 */
export default function FilterTabs({ tabs, active, onChange, counts }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Фильтр курсов"
      className="flex flex-wrap gap-2.5"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'border-cyan-400/70 text-cyan-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="tab-glow"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_18px_rgba(0,210,255,0.35)]"
              />
            )}
            {tab.label}
            <span
              className={`ml-2 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-800 text-slate-500'
              }`}
            >
              {counts[tab.id] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

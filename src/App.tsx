import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterTabs from './components/FilterTabs';
import LanguageCard from './components/LanguageCard';
import DailyQuestSidebar from './components/DailyQuestSidebar';
import { filterTabs, languages, navLinks } from './data/mockData';
import type { FilterId } from './types';

/**
 * Главная страница (Dashboard) тренажёра CodePulse.
 * Структура: фоновые неон-эффекты → Header → Hero → фильтры + сетка курсов → сайдбар → футер.
 */
export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  // Курсы, попадающие в выбранную вкладку
  const visibleLanguages = useMemo(
    () =>
      activeFilter === 'all'
        ? languages
        : languages.filter((lang) => lang.categories.includes(activeFilter)),
    [activeFilter],
  );

  // Счётчики для бейджей на вкладках
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: languages.length };
    for (const tab of filterTabs) {
      if (tab.id !== 'all') map[tab.id] = languages.filter((l) => l.categories.includes(tab.id)).length;
    }
    return map;
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080811]">
      {/* ===== Фоновые эффекты: неон-пятна + кибер-сетка ===== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="glow-blob -top-40 -left-32 h-96 w-96 bg-cyan-500/15" />
        <div className="glow-blob -top-20 right-0 h-[28rem] w-[28rem] bg-fuchsia-600/15" />
        <div className="glow-blob top-1/3 left-1/2 h-80 w-80 bg-purple-600/10" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8">
        <Hero />

        {/* ===== Каталог курсов + сайдбар ===== */}
        <div
          id="trainer"
          className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
        >
          <section aria-label="Каталог курсов">
            {/* Заголовок секции + фильтры */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-semibold whitespace-nowrap text-white [text-shadow:0_0_16px_rgba(0,210,255,0.35)]">
                Выбери язык
              </h2>
              <FilterTabs
                tabs={filterTabs}
                active={activeFilter}
                onChange={setActiveFilter}
                counts={counts}
              />
            </div>

            {/* Сетка карточек: 1 → 2 → 3 → 4 колонки (до 4K) */}
            <motion.div
              layout
              className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {visibleLanguages.map((lang, i) => (
                  <LanguageCard key={lang.id} language={lang} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Защита от пустого результата фильтра */}
            {visibleLanguages.length === 0 && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-14 text-center">
                <SearchX className="h-8 w-8 text-slate-600" />
                <p className="text-sm text-slate-500">В этой категории курсов пока нет.</p>
              </div>
            )}
          </section>

          {/* ===== Задание дня / достижения ===== */}
          <DailyQuestSidebar />
        </div>
      </main>

      {/* ===== Футер ===== */}
      <footer className="border-t border-slate-800/80 bg-[#080811]/80">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <p className="flex items-center gap-2">
            <span className="font-mono font-bold text-cyan-400 [text-shadow:0_0_10px_rgba(0,210,255,0.6)]">
              &lt;/&gt;
            </span>
            CodePulse © 2026 — учись, кодь, пульсируй.
          </p>
          <nav className="flex gap-5" aria-label="Ссылки в подвале">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-cyan-300">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

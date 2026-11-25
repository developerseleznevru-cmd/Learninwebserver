import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Menu, X, Zap } from 'lucide-react';
import { currentUser, navLinks } from '../data/mockData';

/**
 * Шапка (навбар): пульсирующее неон-лого, навигация и блок профиля
 * (стрик 🔥, XP ⚡, аватар с неоновой рамкой).
 * На мобильных пункты меню прячутся за «гамбургер».
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080811]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Логотип с пульсацией */}
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <span className="logo-pulse grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/60 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-300">
            &lt;/&gt;
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white [text-shadow:0_0_18px_rgba(0,210,255,0.55)]">
            Code<span className="text-cyan-300">Pulse</span>
          </span>
        </a>

        {/* Навигация (desktop) */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                link.active
                  ? 'text-cyan-300 [text-shadow:0_0_12px_rgba(0,210,255,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
              {link.active && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan-400 shadow-[0_0_10px_rgba(0,210,255,0.9)]"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Профиль (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Стрик дней */}
          <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5">
            <Flame className="h-4 w-4 text-orange-400 [filter:drop-shadow(0_0_6px_rgba(255,87,34,0.9))]" />
            <span className="text-xs font-semibold text-orange-300">
              {currentUser.streakDays} дней подряд
            </span>
          </div>

          {/* Очки опыта */}
          <div className="flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1.5">
            <Zap className="h-4 w-4 text-fuchsia-400 [filter:drop-shadow(0_0_6px_rgba(189,0,255,0.9))]" />
            <span className="text-xs font-semibold text-fuchsia-300 [text-shadow:0_0_10px_rgba(189,0,255,0.6)]">
              {currentUser.xp.toLocaleString('ru-RU')} XP
            </span>
          </div>

          {/* Аватар с неоновой круговой рамкой */}
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(189,0,255,0.45)]"
            aria-label={`Профиль ${currentUser.name}`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-xs font-bold text-white ring-2 ring-fuchsia-400/80 [filter:drop-shadow(0_0_8px_rgba(189,0,255,0.7))]">
              {currentUser.initials}
            </span>
            <span className="text-sm font-medium text-slate-200">{currentUser.name}</span>
          </button>
        </div>

        {/* Мобильное меню: кнопка + блок профиля (стрик/XP) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1.5">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-xs font-semibold text-orange-300">{currentUser.streakDays}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-1.5">
            <Zap className="h-4 w-4 text-fuchsia-400" />
            <span className="text-xs font-semibold text-fuchsia-300">
              {(currentUser.xp / 1000).toFixed(2).replace('.', ',')}k
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Выпадающее меню на мобильных */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-800/80 lg:hidden"
            aria-label="Мобильная навигация"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    link.active
                      ? 'bg-cyan-400/10 text-cyan-300'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 border-t border-slate-800 pt-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-xs font-bold text-white ring-2 ring-fuchsia-400/80">
                  {currentUser.initials}
                </span>
                <span className="text-sm font-medium text-slate-200">{currentUser.name}</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

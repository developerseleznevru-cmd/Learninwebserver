import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, LogIn, LogOut, Menu, Search, X, Zap } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { currentUser, navLinks } from '../data/mockData';
import type { SectionId } from '../types';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onLoginClick: () => void;
  /** Поисковый запрос по курсам (поднят в App для фильтрации каталога) */
  query: string;
  onQueryChange: (value: string) => void;
  /** Отправка формы поиска: переход к каталогу курсов */
  onSearchSubmit: () => void;
}

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  className?: string;
}

/**
 * Поисковая строка: инпут + кнопка «Найти».
 * Enter или кнопка вызывают onSubmit; ввод — живая фильтрация каталога.
 */
function SearchField({ value, onChange, onSubmit, className = '' }: SearchFieldProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Поиск курса…"
          aria-label="Поиск курса"
          className="w-full rounded-lg border border-slate-800 bg-slate-900/60 py-2 pr-3 pl-9 text-sm text-slate-200 transition-colors outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:shadow-[0_0_14px_rgba(0,210,255,0.25)]"
        />
      </div>
      <button
        type="submit"
        className="neon-btn inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-cyan-400/60 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-200"
        style={{ ['--glow-rgb' as string]: '0,210,255' }}
      >
        <Search className="h-4 w-4" />
        Найти
      </button>
    </form>
  );
}

/**
 * Шапка (навбар): пульсирующее неон-лого, навигация и блок профиля
 * (стрик 🔥, XP ⚡, аватар с неоновой рамкой или кнопка «Войти»).
 * На мобильных пункты меню прячутся за «гамбургер».
 */
export default function Header({
  activeSection,
  onNavigate,
  onLoginClick,
  query,
  onQueryChange,
  onSearchSubmit,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080811]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Логотип с пульсацией */}
        <button
          type="button"
          onClick={() => onNavigate('trainer')}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="CodePulse — на главную"
        >
          <span className="logo-pulse grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/60 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-300">
            &lt;/&gt;
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white [text-shadow:0_0_18px_rgba(0,210,255,0.55)]">
            Code<span className="text-cyan-300">Pulse</span>
          </span>
        </button>

        {/* Навигация (desktop) — без изменений */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => {
            const isActive = link.id === activeSection;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-300 [text-shadow:0_0_12px_rgba(0,210,255,0.6)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan-400 shadow-[0_0_10px_rgba(0,210,255,0.9)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Поиск курса: между меню и блоком профиля / «Войти» (desktop) */}
        <div className="hidden shrink-0 items-center md:flex">
          <SearchField
            value={query}
            onChange={onQueryChange}
            onSubmit={onSearchSubmit}
            className="w-64 md:w-72 lg:w-80 xl:w-96"
          />
        </div>

        {/* Профиль (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
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

              {/* Аватар с меню профиля */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-expanded={userMenuOpen}
                  aria-label={`Профиль ${user.name}`}
                  className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1 transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(189,0,255,0.45)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-xs font-bold text-white ring-2 ring-fuchsia-400/80 [filter:drop-shadow(0_0_8px_rgba(189,0,255,0.7))]">
                    {user.initials}
                  </span>
                  <span className="text-sm font-medium text-slate-200">{user.name}</span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-2 w-60 rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
                    >
                      <p className="px-2.5 py-1.5 text-xs text-slate-500">{user.email}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-rose-300 transition-colors hover:bg-rose-400/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Выйти
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="neon-btn inline-flex items-center gap-2 rounded-lg border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200"
              style={{ ['--glow-rgb' as string]: '0,210,255' }}
            >
              <LogIn className="h-4 w-4" />
              Войти
            </button>
          )}
        </div>

        {/* Мобильное меню: кнопка + блок профиля (стрик/XP) */}
        <div className="flex items-center gap-2 lg:hidden">
          {user ? (
            <>
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
            </>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/60 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200"
            >
              <LogIn className="h-3.5 w-3.5" />
              Войти
            </button>
          )}
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
              {/* Поиск курса на мобильных — в верху выпадающего меню */}
              <div className="pb-2">
                <SearchField
                  value={query}
                  onChange={onQueryChange}
                  onSubmit={() => {
                    onSearchSubmit();
                    setMenuOpen(false);
                  }}
                />
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    onNavigate(link.id);
                    setMenuOpen(false);
                  }}
                  aria-current={link.id === activeSection ? 'page' : undefined}
                  className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    link.id === activeSection
                      ? 'bg-cyan-400/10 text-cyan-300'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-slate-800 pt-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-xs font-bold text-white ring-2 ring-fuchsia-400/80">
                      {user.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-200">
                        {user.name}
                      </span>
                      <span className="block truncate text-xs text-slate-500">{user.email}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-400/30 bg-rose-400/10 px-2.5 py-1.5 text-xs font-semibold text-rose-300"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Выйти
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLoginClick();
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/60 bg-cyan-400/10 px-3 py-2.5 text-sm font-semibold text-cyan-200"
                  >
                    <LogIn className="h-4 w-4" />
                    Войти или зарегистрироваться
                  </button>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Lock, Mail, User, Zap } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export type AuthMode = 'login' | 'register';

interface AuthPageProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onSuccess: (userName: string) => void;
  onClose: () => void;
}

const inputClass =
  'w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400/60';

/** Страница входа и регистрации */
export default function AuthPage({ mode, onModeChange, onSuccess, onClose }: AuthPageProps) {
  const { login, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isRegister = mode === 'register';

  const switchMode = (next: AuthMode) => {
    setError(null);
    setPassword('');
    setConfirm('');
    onModeChange(next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    const result = isRegister
      ? await register(name, email, password, confirm)
      : await login(email, password);
    setSubmitting(false);

    if (result.ok) {
      onSuccess(result.user.name);
    } else {
      setError(result.error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex min-h-[70vh] items-center justify-center py-10"
      aria-labelledby="auth-title"
    >
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          К тренажёру
        </button>

        <div className="neon-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md sm:p-8">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <div className="relative">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(0,210,255,0.3)]">
              <Lock className="h-5 w-5" />
            </span>

            <h1 id="auth-title" className="mt-4 font-display text-2xl font-bold text-white">
              {isRegister ? 'Регистрация' : 'Вход в CodePulse'}
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              {isRegister
                ? 'Создай аккаунт, чтобы прогресс курсов сохранялся.'
                : 'Войди, чтобы продолжить с того же урока.'}
            </p>

            {/* Переключатель режима */}
            <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl border border-slate-800 bg-slate-950/50 p-1">
              {(['login', 'register'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => switchMode(value)}
                  aria-pressed={mode === value}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    mode === value
                      ? 'bg-cyan-400/15 text-cyan-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {value === 'login' ? 'Вход' : 'Регистрация'}
                </button>
              ))}
            </div>

            <form className="mt-5 space-y-3.5" onSubmit={handleSubmit} noValidate>
              {isRegister && (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-400">Имя</span>
                  <span className="relative block">
                    <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="Алекс"
                      className={inputClass}
                    />
                  </span>
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">E-mail</span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">Пароль</span>
                <span className="relative block">
                  <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    placeholder="Минимум 6 символов"
                    className={inputClass}
                  />
                </span>
              </label>

              {isRegister && (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-400">
                    Повторите пароль
                  </span>
                  <span className="relative block">
                    <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                      placeholder="Ещё раз"
                      className={inputClass}
                    />
                  </span>
                </label>
              )}

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/5 px-3 py-2.5 text-sm text-rose-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="neon-btn flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/60 bg-cyan-400/15 px-4 py-2.5 text-sm font-semibold text-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ ['--glow-rgb' as string]: '0,210,255' }}
              >
                <Zap className="h-4 w-4" />
                {submitting ? 'Подождите…' : isRegister ? 'Создать аккаунт' : 'Войти'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-600">
              Демо-режим: аккаунты хранятся только в этом браузере.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

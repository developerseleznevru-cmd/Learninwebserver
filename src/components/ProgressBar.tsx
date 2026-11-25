import { motion } from 'framer-motion';

interface ProgressBarProps {
  /** Прогресс 0–100 */
  value: number;
  /** Старт градиента (hex) — обычно фирменный цвет курса */
  from: string;
  /** Конец градиента (hex). По умолчанию = from */
  to?: string;
  /** Задержка старта анимации (сек) — для каскада карточек */
  delay?: number;
  /** Дополнительные классы контейнера */
  className?: string;
}

/**
 * Неоновая полоса прогресса.
 * Заливка анимируется от 0 → value и светится цветом `from`.
 */
export default function ProgressBar({
  value,
  from,
  to,
  delay = 0,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const end = to ?? from;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-800 ring-1 ring-inset ring-slate-700/60 ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${from}, ${end})`,
          boxShadow: `0 0 12px ${from}cc, 0 0 4px ${end}aa`,
        }}
      />
    </div>
  );
}

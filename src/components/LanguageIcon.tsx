import type { Language } from '../types';
import { languageLogos } from '../data/languageLogos';

interface LanguageIconProps {
  language: Language;
  /** Размер задаётся классами (например, "h-6 w-6") */
  className?: string;
}

/**
 * Логотип языка: локальный SVG закрашивается текущим цветом через CSS-маску,
 * поэтому сохраняется неоновая стилистика карточек.
 * Если официального логотипа нет — показываем иконку lucide из данных курса.
 */
export default function LanguageIcon({ language, className = 'h-6 w-6' }: LanguageIconProps) {
  const src = languageLogos[language.id];

  if (!src) {
    const Icon = language.icon;
    return <Icon className={className} />;
  }

  return (
    <span
      aria-hidden
      className={`inline-block bg-current ${className}`}
      style={{
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}

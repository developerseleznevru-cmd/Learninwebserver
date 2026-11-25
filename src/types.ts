import type { LucideIcon } from 'lucide-react';

/** Идентификаторы вкладок-фильтров */
export type FilterId = 'all' | 'frontend' | 'backend' | 'popular';

/** Вкладка фильтра (лейбл + количество совпадений считается из данных) */
export interface FilterTab {
  id: FilterId;
  label: string;
}

/** Курс языка программирования */
export interface Language {
  id: string;
  name: string;
  /** Краткое описание: зачем учить (1–2 предложения) */
  description: string;
  /** Фирменный неоновый цвет, hex без решётки не нужен — полный hex: "#00D2FF" */
  color: string;
  /** RGB-триплет для CSS-переменной --glow-rgb: "0,210,255" */
  colorRGB: string;
  /** Бейджь сложности: «Для новичков», «Базовый уровень»… */
  level: string;
  /** Иконка курса (lucide) */
  icon: LucideIcon;
  /** Прогресс 0–100 */
  progress: number;
  lessonsDone: number;
  lessonsTotal: number;
  /** Сколько XP даёт полное прохождение курса */
  xpReward: number;
  /** К каким фильтрам относится курс */
  categories: FilterId[];
}

/** Данные авторизованного пользователя (мок) */
export interface UserProfile {
  name: string;
  initials: string;
  streakDays: number;
  xp: number;
  level: number;
  rank: string;
  /** Дневная норма: сколько уроков из заданного */
  dailyDone: number;
  dailyGoal: number;
}

/** Задание дня (мок) */
export interface DailyQuest {
  title: string;
  hint: string;
  rewardXp: number;
  progress: number;
  total: number;
}

import {
  Atom,
  Braces,
  Database,
  FileCode,
  Palette,
  Server,
  Terminal,
  Type,
} from 'lucide-react';
import type { DailyQuest, FilterTab, Language, UserProfile } from '../types';

/* ============================================================
   МОК-ДАННЫЕ CodePulse
   Всё, что нужно кастомизировать (пользователь, квесты, курсы),
   лежит в одном месте — правьте значения, вёрстка не меняется.
   ============================================================ */

/** Пользователь демо-аккаунта */
export const currentUser: UserProfile = {
  name: 'Alex Dev',
  initials: 'AD',
  streakDays: 5,
  xp: 1250,
  level: 12,
  rank: 'Новичок-разработчик',
  dailyDone: 3,
  dailyGoal: 5,
};

/** Ссылки навбара */
export const navLinks: { label: string; href: string; active?: boolean }[] = [
  { label: 'Тренажер', href: '#trainer', active: true },
  { label: 'Задачи', href: '#tasks' },
  { label: 'Рейтинг', href: '#rating' },
  { label: 'Дорожная карта', href: '#roadmap' },
];

/** Вкладки-фильтры каталога курсов */
export const filterTabs: FilterTab[] = [
  { id: 'all', label: 'Все языки' },
  { id: 'frontend', label: 'Frontend старт' },
  { id: 'backend', label: 'Backend' },
  { id: 'popular', label: 'Популярное' },
];

/**
 * Курсы языков.
 * color / colorRGB — фирменный неоновый цвет (hex + rgb-триплет для теней).
 * progress вычислять не обязательно — просто держите процент и счётчик уроков согласованными.
 */
export const languages: Language[] = [
  {
    id: 'html5',
    name: 'HTML5',
    description:
      'Фундамент любого сайта. Освой семантическую разметку и собери свою первую веб-страницу уже сегодня.',
    color: '#FF5722',
    colorRGB: '255,87,34',
    level: 'Для новичков',
    icon: FileCode,
    progress: 47,
    lessonsDone: 14,
    lessonsTotal: 30,
    xpReward: 500,
    categories: ['frontend', 'popular'],
  },
  {
    id: 'css3',
    name: 'CSS3',
    description:
      'Придавай страницам стиль: Flexbox, Grid и анимации. Узнай, как верстка становится живой.',
    color: '#00D2FF',
    colorRGB: '0,210,255',
    level: 'Базовый уровень',
    icon: Palette,
    progress: 33,
    lessonsDone: 10,
    lessonsTotal: 30,
    xpReward: 600,
    categories: ['frontend', 'popular'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description:
      'Язык интерактива. Научись мыслить как программист и оживляй страницы логикой и событиями.',
    color: '#FFE600',
    colorRGB: '255,230,0',
    level: 'Базовый уровень',
    icon: Braces,
    progress: 40,
    lessonsDone: 12,
    lessonsTotal: 30,
    xpReward: 900,
    categories: ['frontend', 'backend', 'popular'],
  },
  {
    id: 'python',
    name: 'Python',
    description:
      'Простой синтаксис — быстрый результат. Идеален для первого знакомства с алгоритмами и бэкендом.',
    color: '#00FF88',
    colorRGB: '0,255,136',
    level: 'Для новичков',
    icon: Terminal,
    progress: 0,
    lessonsDone: 0,
    lessonsTotal: 30,
    xpReward: 700,
    categories: ['backend', 'popular'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description:
      'JavaScript, который ловит ошибки до запуска. Строки типов спасают нервы в больших проектах.',
    color: '#BD00FF',
    colorRGB: '189,0,255',
    level: 'Продолжающий',
    icon: Type,
    progress: 0,
    lessonsDone: 0,
    lessonsTotal: 24,
    xpReward: 800,
    categories: ['frontend'],
  },
  {
    id: 'react',
    name: 'React',
    description:
      'Главный инструмент фронтендера. Создавай интерфейс из переиспользуемых компонентов.',
    color: '#BD00FF',
    colorRGB: '189,0,255',
    level: 'Продолжающий',
    icon: Atom,
    progress: 0,
    lessonsDone: 0,
    lessonsTotal: 26,
    xpReward: 1000,
    categories: ['frontend'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description:
      'JavaScript выходит из браузера: пиши серверы и API на том же языке, который уже знаешь.',
    color: '#A3E635',
    colorRGB: '163,230,53',
    level: 'Продолжающий',
    icon: Server,
    progress: 25,
    lessonsDone: 6,
    lessonsTotal: 24,
    xpReward: 750,
    categories: ['backend', 'popular'],
  },
  {
    id: 'sql',
    name: 'SQL',
    description:
      'Язык баз данных. Храни, фильтруй и объединяй данные — навык №1 для любой вакансии в IT.',
    color: '#4C8DFF',
    colorRGB: '76,141,255',
    level: 'Базовый уровень',
    icon: Database,
    progress: 0,
    lessonsDone: 0,
    lessonsTotal: 20,
    xpReward: 650,
    categories: ['backend', 'popular'],
  },
];

/** Задание дня */
export const dailyQuest: DailyQuest = {
  title: 'Пройди 2 урока по Flexbox',
  hint: 'Освой выравнивание блоков — база любой вёрстки.',
  rewardXp: 100,
  progress: 1,
  total: 2,
};

/** Мини-достижения в сайдбаре (мок) */
export const achievements = [
  { id: 'first-step', label: 'Первый урок', done: true },
  { id: 'week-streak', label: 'Стрик 7 дней', done: false },
  { id: 'html-master', label: 'Мастер HTML', done: false },
] as const;

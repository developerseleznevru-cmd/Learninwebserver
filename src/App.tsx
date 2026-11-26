import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, SearchX } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterTabs from './components/FilterTabs';
import LanguageCard from './components/LanguageCard';
import CoursePage from './components/CoursePage';
import TaskPage from './components/TaskPage';
import TasksSection from './components/TasksSection';
import RatingSection from './components/RatingSection';
import RoadmapSection from './components/RoadmapSection';
import AuthPage from './components/AuthPage';
import type { AuthMode } from './components/AuthPage';
import DailyQuestSidebar from './components/DailyQuestSidebar';
import { filterTabs, languages, navLinks } from './data/mockData';
import { lessonsByCourse } from './data/lessons';
import type { FilterId, Language, SectionId } from './types';

/** Стартовые пройденные уроки: первые N заданий каждого курса */
const initialCompleted = Object.fromEntries(
  languages.map((course) => [
    course.id,
    Array.from(
      { length: Math.min(course.lessonsDone, lessonsByCourse[course.id]?.length ?? 0) },
      (_, i) => i,
    ),
  ]),
) as Record<string, number[]>;

/**
 * Главная страница (Dashboard) тренажёра CodePulse.
 * Экраны: каталог курсов → страница курса → страница задания.
 */
export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [section, setSection] = useState<SectionId>('trainer');
  const [completed, setCompleted] = useState<Record<string, number[]>>(initialCompleted);
  const [openCourseId, setOpenCourseId] = useState<string | null>(null);
  const [openLessonIndex, setOpenLessonIndex] = useState<number | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);

  // Прогресс курса вычисляется из пройденных заданий
  const courses: Language[] = useMemo(
    () =>
      languages.map((course) => {
        const lessons = lessonsByCourse[course.id] ?? [];
        const done = completed[course.id]?.length ?? 0;
        const total = lessons.length || course.lessonsTotal;
        return {
          ...course,
          lessonsDone: done,
          lessonsTotal: total,
          progress: total ? Math.round((done / total) * 100) : 0,
        };
      }),
    [completed],
  );

  const openCourse = openCourseId ? courses.find((c) => c.id === openCourseId) : undefined;
  const openLessons = openCourse ? lessonsByCourse[openCourse.id] ?? [] : [];
  const openLesson = openLessonIndex !== null ? openLessons[openLessonIndex] : undefined;

  // Курсы, попадающие в выбранную вкладку
  const visibleLanguages = useMemo(
    () =>
      activeFilter === 'all'
        ? courses
        : courses.filter((lang) => lang.categories.includes(activeFilter)),
    [activeFilter, courses],
  );

  // Счётчики для бейджей на вкладках
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: courses.length };
    for (const tab of filterTabs) {
      if (tab.id !== 'all') map[tab.id] = courses.filter((l) => l.categories.includes(tab.id)).length;
    }
    return map;
  }, [courses]);

  // Уведомление исчезает само
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Переход по пунктам меню: закрываем открытый курс/задание и экран входа
  const navigate = (id: SectionId) => {
    setSection(id);
    setOpenCourseId(null);
    setOpenLessonIndex(null);
    setAuthMode(null);
    setToast(null);
    window.scrollTo({ top: 0 });
  };

  // Успешный вход или регистрация: возвращаемся в тренажёр
  const handleAuthSuccess = (userName: string) => {
    setAuthMode(null);
    setSection('trainer');
    setOpenCourseId(null);
    setOpenLessonIndex(null);
    setToast({ id: Date.now(), text: `Добро пожаловать, ${userName}!` });
  };

  // Кнопка на карточке открывает страницу курса
  const openCoursePage = (id: string) => {
    setOpenCourseId(id);
    setOpenLessonIndex(null);
    setToast(null);
  };

  // Задание из раздела «Задачи» открывается сразу
  const openTask = (courseId: string, index: number) => {
    setOpenCourseId(courseId);
    setOpenLessonIndex(index);
    setToast(null);
  };

  // Успешная автопроверка засчитывает урок
  const completeLesson = (courseId: string, index: number) => {
    const lesson = lessonsByCourse[courseId]?.[index];
    setCompleted((prev) => {
      const list = prev[courseId] ?? [];
      if (list.includes(index)) return prev;
      return { ...prev, [courseId]: [...list, index] };
    });
    if (lesson) setToast({ id: Date.now(), text: `Урок «${lesson.title}» пройден` });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080811]">
      {/* ===== Фоновые эффекты: неон-пятна + кибер-сетка ===== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="glow-blob -top-40 -left-32 h-96 w-96 bg-cyan-500/15" />
        <div className="glow-blob -top-20 right-0 h-[28rem] w-[28rem] bg-fuchsia-600/15" />
        <div className="glow-blob top-1/3 left-1/2 h-80 w-80 bg-purple-600/10" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <Header
        activeSection={section}
        onNavigate={navigate}
        onLoginClick={() => setAuthMode('login')}
      />

      <main className="mx-auto w-full max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8">
        {authMode ? (
          <AuthPage
            mode={authMode}
            onModeChange={setAuthMode}
            onSuccess={handleAuthSuccess}
            onClose={() => setAuthMode(null)}
          />
        ) : openCourse && openLesson && openLessonIndex !== null ? (
          <TaskPage
            key={openLesson.id}
            course={openCourse}
            lesson={openLesson}
            index={openLessonIndex}
            total={openLessons.length}
            isCompleted={completed[openCourse.id]?.includes(openLessonIndex) ?? false}
            onBack={() => setOpenLessonIndex(null)}
            onComplete={() => completeLesson(openCourse.id, openLessonIndex)}
            onNext={
              openLessonIndex + 1 < openLessons.length
                ? () => setOpenLessonIndex(openLessonIndex + 1)
                : undefined
            }
          />
        ) : openCourse ? (
          <CoursePage
            course={openCourse}
            lessons={openLessons}
            completed={completed[openCourse.id] ?? []}
            onBack={() => setOpenCourseId(null)}
            onOpenLesson={setOpenLessonIndex}
          />
        ) : section === 'tasks' ? (
          <TasksSection
            courses={courses}
            completed={completed}
            onOpenLesson={openTask}
          />
        ) : section === 'rating' ? (
          <RatingSection />
        ) : section === 'roadmap' ? (
          <RoadmapSection courses={courses} onOpenCourse={openCoursePage} />
        ) : (
          <>
            <Hero onLoginClick={() => setAuthMode('login')} />

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
                      <LanguageCard
                        key={lang.id}
                        language={lang}
                        index={i}
                        onStart={openCoursePage}
                      />
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
          </>
        )}
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
              <button
                key={l.id}
                type="button"
                onClick={() => navigate(l.id)}
                className="transition-colors hover:text-cyan-300"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>

      {/* ===== Тост-подтверждение действия ===== */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center gap-2.5 rounded-xl border border-lime-400/40 bg-slate-900/95 px-4 py-3 text-sm font-medium text-white shadow-[0_0_28px_rgba(0,255,136,0.25)] backdrop-blur-md"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-300" />
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

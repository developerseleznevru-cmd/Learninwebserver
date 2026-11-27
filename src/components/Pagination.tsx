import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  /** Текущая страница, начиная с 1 */
  page: number;
  /** Всего страниц */
  pages: number;
  onChange: (page: number) => void;
}

interface PageItem {
  key: string;
  page?: number;
}

const buildItems = (current: number, total: number): PageItem[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({ key: `p${i + 1}`, page: i + 1 }));
  }

  const items: PageItem[] = [{ key: 'p1', page: 1 }];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push({ key: 'gap-left' });
  for (let p = start; p <= end; p += 1) items.push({ key: `p${p}`, page: p });
  if (end < total - 1) items.push({ key: 'gap-right' });

  items.push({ key: `p${total}`, page: total });
  return items;
};

/** Пагинация каталога курсов */
export default function Pagination({ page, pages, onChange }: PaginationProps) {
  if (pages <= 1) return null;

  const items = buildItems(page, pages);
  const baseButton =
    'grid h-9 min-w-9 place-items-center rounded-lg border px-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Пагинация курсов">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
        className={`${baseButton} border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {items.map((item) =>
        item.page ? (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.page!)}
            aria-current={item.page === page ? 'page' : undefined}
            aria-label={`Страница ${item.page}`}
            className={`${baseButton} ${
              item.page === page
                ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_16px_rgba(0,210,255,0.3)]'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-white'
            }`}
          >
            {item.page}
          </button>
        ) : (
          <span key={item.key} className="px-1 text-sm text-slate-600" aria-hidden>
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        aria-label="Следующая страница"
        className={`${baseButton} border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

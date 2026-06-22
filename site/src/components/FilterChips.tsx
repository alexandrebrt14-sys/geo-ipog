import { useRef, useState } from 'react';

interface Option { id: string; label: string; }
interface Props {
  options: Option[];
  defaultActive?: string;
  onChange?: (id: string) => void;
  label?: string;
}

export default function FilterChips({ options, defaultActive = 'all', onChange, label = 'Filtrar' }: Props) {
  const [active, setActive] = useState(defaultActive);
  const handle = (id: string) => { setActive(id); onChange?.(id); };
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Navegação por teclado entre os chips: setas movem o foco e mantêm o
  // chip visível no scroll horizontal; Home/End vão ao primeiro/último.
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = options.length;
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = (index + 1) % count;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (index - 1 + count) % count;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = count - 1;
    } else {
      return;
    }
    event.preventDefault();
    const target = chipRefs.current[next];
    target?.focus();
    target?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  if (options.length === 0) {
    return (
      <div className="flex items-center gap-3 pb-1">
        <span className="text-xs uppercase tracking-wider text-ink-500 font-semibold shrink-0 mr-1">{label}:</span>
        <span className="text-sm text-ink-500">Nenhum filtro disponível.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto scroll-fade pb-1">
      <span id="filter-chips-label" className="text-xs uppercase tracking-wider text-ink-500 font-semibold shrink-0 mr-1">{label}:</span>
      <div role="group" aria-labelledby="filter-chips-label" className="flex gap-2 shrink-0">
        {options.map((o, i) => (
          <button
            key={o.id}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            type="button"
            onClick={() => handle(o.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`chip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${active === o.id ? 'chip-active' : ''}`}
            aria-pressed={active === o.id}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

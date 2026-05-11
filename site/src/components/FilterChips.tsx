import { useState } from 'react';

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

  return (
    <div className="flex items-center gap-3 overflow-x-auto scroll-fade pb-1">
      <span className="text-xs uppercase tracking-wider text-ink-500 font-semibold shrink-0 mr-1">{label}:</span>
      <div className="flex gap-2 shrink-0">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => handle(o.id)}
            className={`chip ${active === o.id ? 'chip-active' : ''}`}
            aria-pressed={active === o.id}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

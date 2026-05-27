import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const links = [
  ['home', 'Home'],
  ['shop', 'Shop'],
  ['checkout', 'Checkout'],
];

export default function Header({ currentPage, onNavigate, onCartOpen }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  const go = (page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 w-[min(1180px,calc(100%_-_24px))] items-center justify-between gap-4">
        <button className="flex items-center gap-3 text-left" onClick={() => go('home')} type="button">
          <img className="h-12 w-12 rounded-xl object-cover ring-1 ring-astra-gold/50" src="/astra-nepal-logo.png" alt="Astra Nepal logo" />
          <span>
            <span className="block text-lg font-black tracking-wide">ASTRA</span>
            <span className="block text-xs font-bold uppercase tracking-[0.28em] text-astra-gold">Nepal</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(([page, label]) => (
            <button
              className={`text-sm font-bold transition ${currentPage === page ? 'text-astra-gold' : 'text-white/70 hover:text-white'}`}
              key={page}
              onClick={() => go(page)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="relative rounded-full border border-white/15 p-3 hover:border-astra-gold/70" onClick={onCartOpen} type="button" aria-label="Open cart">
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-astra-gold text-xs font-black text-black">{count}</span>}
          </button>
          <button className="rounded-full border border-white/15 p-3 md:hidden" onClick={() => setOpen((value) => !value)} type="button" aria-label="Open menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto grid w-[min(1180px,calc(100%_-_24px))] gap-2 pb-4 md:hidden">
          {links.map(([page, label]) => (
            <button className="rounded-2xl bg-white/8 px-4 py-3 text-left font-bold" key={page} onClick={() => go(page)} type="button">
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}


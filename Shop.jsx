import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { categories, products } from '../data/products.js';

export default function Shop({ onNavigate }) {
  const [category, setCategory] = useState('All');
  const filtered = useMemo(
    () => (category === 'All' ? products : products.filter((product) => product.category === category)),
    [category]
  );

  return (
    <section className="mx-auto w-[min(1180px,calc(100%_-_24px))] py-14">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-astra-gold">Shop</p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">Streetwear collection</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-black ${category === item ? 'bg-astra-gold text-black' : 'border border-white/15 text-white/70'}`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}
      </div>
    </section>
  );
}


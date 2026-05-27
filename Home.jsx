import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Home({ onNavigate }) {
  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(214,168,74,.22),transparent_34%),linear-gradient(120deg,rgba(0,0,0,.35),#050505_62%)]" />
        <div className="mx-auto grid min-h-[calc(100vh-80px)] w-[min(1180px,calc(100%_-_24px))] items-center gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-astra-gold">Astra Nepal Streetwear</p>
            <h1 className="mt-5 max-w-3xl text-[clamp(3.6rem,11vw,8.8rem)] font-black uppercase leading-[0.82] tracking-tight">
              Premium fits for the city.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/65">
              Black, white, and gold essentials inspired by Nepal's peaks, streets, and after-dark energy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-astra-gold px-6 py-4 font-black text-black" onClick={() => onNavigate('shop')} type="button">
                Shop collection <ArrowRight size={18} />
              </button>
              <button className="rounded-full border border-white/15 px-6 py-4 font-black hover:border-astra-gold" onClick={() => onNavigate('product', products[0].id)} type="button">
                View drop
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-gold">
              <img className="h-[560px] w-full rounded-[1.4rem] object-cover" src="/astra-nepal-logo.png" alt="Astra Nepal logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1180px,calc(100%_-_24px))] gap-4 py-10 md:grid-cols-3">
        {[
          [Sparkles, 'Premium identity', 'Minimal streetwear with sharp gold details.'],
          [Truck, 'Nepal delivery ready', 'Checkout UI prepared for local orders.'],
          [ShieldCheck, 'Secure cart flow', 'Add, update, remove, and review items.'],
        ].map(([Icon, title, text]) => (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6" key={title}>
            <Icon className="text-astra-gold" />
            <h3 className="mt-5 text-xl font-black">{title}</h3>
            <p className="mt-2 text-white/55">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%_-_24px))] py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-astra-gold">Featured</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">Latest drop</h2>
          </div>
          <button className="rounded-full border border-white/15 px-5 py-3 font-black hover:border-astra-gold" onClick={() => onNavigate('shop')} type="button">
            View all products
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}
        </div>
      </section>
    </>
  );
}


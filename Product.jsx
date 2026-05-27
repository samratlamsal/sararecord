import { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function Product({ product, onNavigate }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();

  return (
    <section className="mx-auto grid w-[min(1180px,calc(100%_-_24px))] gap-10 py-14 lg:grid-cols-[1.05fr_.95fr]">
      <div className="grid gap-4 md:grid-cols-2">
        {product.gallery.map((image) => (
          <img className="h-[520px] w-full rounded-[1.8rem] object-cover" key={image} src={image} alt={product.name} />
        ))}
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-astra-gold">{product.badge}</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">{product.name}</h1>
        <p className="mt-5 text-xl font-black text-astra-softGold">{formatPrice(product.price)}</p>
        <p className="mt-5 text-white/65">{product.description}</p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-white/55">Select size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((item) => (
              <button className={`min-w-14 rounded-full px-4 py-3 font-black ${size === item ? 'bg-white text-black' : 'border border-white/15'}`} key={item} onClick={() => setSize(item)} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-astra-gold px-6 py-4 font-black text-black" onClick={() => addToCart(product, size)} type="button">
          <ShoppingBag size={19} /> Add to cart
        </button>

        <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
          {product.details.map((detail) => (
            <div className="flex gap-3 border-b border-white/10 py-3 last:border-0" key={detail}>
              <Check className="mt-1 text-astra-gold" size={18} />
              <span className="text-white/70">{detail}</span>
            </div>
          ))}
        </div>

        <button className="mt-5 text-sm font-black text-astra-gold" onClick={() => onNavigate('shop')} type="button">
          Back to shop
        </button>
      </div>
    </section>
  );
}


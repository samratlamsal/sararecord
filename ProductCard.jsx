import { Eye, Plus } from 'lucide-react';
import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product, onNavigate }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04]">
      <button className="block w-full overflow-hidden" onClick={() => onNavigate('product', product.id)} type="button">
        <img className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
      </button>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-astra-gold">{product.category}</p>
            <h3 className="mt-1 text-xl font-black">{product.name}</h3>
          </div>
          <strong className="whitespace-nowrap text-astra-softGold">{formatPrice(product.price)}</strong>
        </div>
        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-astra-gold px-4 py-3 text-sm font-black text-black" onClick={() => addToCart(product)} type="button">
            <Plus size={17} /> Add
          </button>
          <button className="rounded-full border border-white/15 px-4 py-3 text-sm font-black hover:border-astra-gold" onClick={() => onNavigate('product', product.id)} type="button" aria-label={`View ${product.name}`}>
            <Eye size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}


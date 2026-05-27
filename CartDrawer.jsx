import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer({ isOpen, onClose, onNavigate }) {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} type="button" aria-label="Close cart" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#090909] p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-astra-gold">Cart</p>
            <h2 className="text-2xl font-black">Your pieces</h2>
          </div>
          <button className="rounded-full border border-white/15 p-3" onClick={onClose} type="button" aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-5">
          {items.length === 0 && <p className="rounded-3xl border border-white/10 p-5 text-white/60">Your cart is empty.</p>}
          {items.map((item) => (
            <div className="grid grid-cols-[84px_1fr] gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-3" key={`${item.id}-${item.size}`}>
              <img className="h-24 w-20 rounded-2xl object-cover" src={item.image} alt={item.name} />
              <div>
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-black">{item.name}</h3>
                    <p className="text-sm text-white/55">Size {item.size}</p>
                  </div>
                  <button className="text-white/55 hover:text-white" onClick={() => removeFromCart(item.id, item.size)} type="button">Remove</button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-white/10">
                    <button className="p-2" onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} type="button"><Minus size={15} /></button>
                    <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                    <button className="p-2" onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} type="button"><Plus size={15} /></button>
                  </div>
                  <strong className="text-astra-softGold">{formatPrice(item.price * item.quantity)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center justify-between text-lg font-black">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button className="mt-5 w-full rounded-full bg-astra-gold px-5 py-4 font-black text-black disabled:opacity-50" disabled={!items.length} onClick={() => { onClose(); onNavigate('checkout'); }} type="button">
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}


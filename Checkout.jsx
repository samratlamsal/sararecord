import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout({ onNavigate }) {
  const { items, subtotal } = useCart();
  const shipping = items.length ? 250 : 0;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto grid w-[min(1180px,calc(100%_-_24px))] gap-8 py-14 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-astra-gold">Checkout</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">Complete your order</h1>
        <form className="mt-8 grid gap-4 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label>First name<input placeholder="Saksham" /></label>
            <label>Last name<input placeholder="Shrestha" /></label>
          </div>
          <label>Email<input placeholder="you@example.com" /></label>
          <label>Phone<input placeholder="+977 98XXXXXXXX" /></label>
          <label>Delivery address<textarea rows="4" placeholder="Street, city, province" /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>Payment method<select><option>Cash on delivery</option><option>Bank transfer</option><option>Digital wallet</option></select></label>
            <label>Delivery option<select><option>Standard delivery</option><option>Express delivery</option></select></label>
          </div>
          <button className="rounded-full bg-astra-gold px-6 py-4 font-black text-black" type="button">Place order</button>
        </form>
      </div>

      <aside className="h-fit rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 lg:sticky lg:top-28">
        <h2 className="text-2xl font-black">Order summary</h2>
        <div className="mt-5 space-y-4">
          {items.length === 0 && (
            <div className="rounded-3xl border border-white/10 p-5 text-white/60">
              Your cart is empty. <button className="font-black text-astra-gold" onClick={() => onNavigate('shop')} type="button">Shop now</button>
            </div>
          )}
          {items.map((item) => (
            <div className="flex gap-4" key={`${item.id}-${item.size}`}>
              <img className="h-20 w-16 rounded-2xl object-cover" src={item.image} alt={item.name} />
              <div className="flex-1">
                <h3 className="font-black">{item.name}</h3>
                <p className="text-sm text-white/55">Size {item.size} x {item.quantity}</p>
              </div>
              <strong className="text-astra-softGold">{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-white/70">
          <div className="flex justify-between"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <div className="flex justify-between"><span>Shipping</span><strong>{formatPrice(shipping)}</strong></div>
          <div className="flex justify-between text-xl text-white"><span>Total</span><strong>{formatPrice(total)}</strong></div>
        </div>
      </aside>
    </section>
  );
}


export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex w-[min(1180px,calc(100%_-_24px))] flex-col gap-4 py-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <p>Astra Nepal. Premium streetwear built for modern Nepal.</p>
        <div className="flex gap-4 font-bold text-white/70">
          <button onClick={() => onNavigate('shop')} type="button">Shop</button>
          <button onClick={() => onNavigate('checkout')} type="button">Checkout</button>
        </div>
      </div>
    </footer>
  );
}


import { useMemo, useState } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/Header.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Checkout from './pages/Checkout.jsx';
import { products } from './data/products.js';

const routes = ['home', 'shop', 'product', 'checkout'];

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) || products[0],
    [selectedProductId]
  );

  const navigate = (nextPage, productId) => {
    if (!routes.includes(nextPage)) return;
    if (productId) setSelectedProductId(productId);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-astra-black text-white">
        <Header currentPage={page} onNavigate={navigate} onCartOpen={() => setIsCartOpen(true)} />
        <main>
          {page === 'home' && <Home onNavigate={navigate} />}
          {page === 'shop' && <Shop onNavigate={navigate} />}
          {page === 'product' && <Product product={selectedProduct} onNavigate={navigate} />}
          {page === 'checkout' && <Checkout onNavigate={navigate} />}
        </main>
        <Footer onNavigate={navigate} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigate={navigate} />
      </div>
    </CartProvider>
  );
}


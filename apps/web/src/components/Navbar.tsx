import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore'; // <--- Usamos Zustand
import logo from '@/assets/logo-mr-teo.png';

const Navbar = () => {
  // Extraemos funciones y datos del store
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Mr. Teo" className="h-12 w-auto animate-flame" />
          <span className="font-display text-xl font-bold tracking-wide text-foreground hidden sm:block">
            MR. TEO
          </span>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-lg bg-secondary hover:bg-muted transition-colors group"
        >
          <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-fire-orange transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-primary-foreground bg-primary rounded-full animate-pulse-fire">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
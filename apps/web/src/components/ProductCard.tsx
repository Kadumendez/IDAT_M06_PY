import { Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, description, price, image }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <article className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover-fire">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-fire-orange transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-2xl font-bold text-fire-yellow">
            S/{price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-fire px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            Agregar al fuego
          </button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{ 
             background: 'radial-gradient(circle at center, hsl(16 100% 50% / 0.1), transparent 70%)' 
           }} 
      />
    </article>
  );
};

export default ProductCard;

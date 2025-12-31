import { Flame } from 'lucide-react';
import { useCartStore } from '../store/cartStore'; // <--- Usamos Zustand
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, description, price, image }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem); // <--- Selector Zustand

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
    toast.success("Agregado al fuego 🔥");
  };

  return (
    <article className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover-fire">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-fire-orange transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-2xl font-bold text-fire-yellow">
            S/{price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-fire px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
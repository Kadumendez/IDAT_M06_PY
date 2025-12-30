import { Flame } from 'lucide-react';
import ProductCard from './ProductCard';

const products = [
  {
    id: '1',
    name: 'Pollo a la Brasa Entero',
    description: 'Pollo entero marinado con hierbas y especias, cocido lentamente sobre carbón de leña.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: '1/2 Pollo a la Brasa',
    description: 'Medio pollo jugoso con papas fritas y ensalada fresca. Perfecto para una persona.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: '1/4 Pollo a la Brasa',
    description: 'Cuarto de pollo con papas y cremas. Ideal para un almuerzo rápido.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Anticuchos de Corazón',
    description: 'Brochetas de corazón de res marinadas en ají panca, servidas con papas y choclo.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Parrilla Mixta Familiar',
    description: 'Combinación de pollo, res, chorizo y mollejas. Para compartir en familia.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Costillas BBQ',
    description: 'Costillas de cerdo bañadas en salsa BBQ ahumada, caramelizadas al carbón.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-fire-orange" />
            <span className="text-fire-orange font-medium uppercase tracking-widest text-sm">
              Nuestro Menú
            </span>
            <Flame className="w-6 h-6 text-fire-orange" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Sabores que <span className="fire-text">Encienden</span> tu Paladar
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada plato preparado con la pasión del fuego y la tradición de nuestras recetas secretas.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

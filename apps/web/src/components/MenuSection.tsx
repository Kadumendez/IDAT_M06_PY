import { useEffect, useState } from 'react'; // <--- 1. Importamos los hooks necesarios
import { Flame, Loader2 } from 'lucide-react'; // Agregué un icono de carga
import ProductCard from './ProductCard';

// 2. Definimos qué forma tienen los datos que vienen de TU API
interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string; // La base de datos envía decimales como string
  image: string | null;
  category: string;
}

const MenuSection = () => {
  // 3. Estados para manejar la información dinámica
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 4. El efecto que llama al Mozo (API) apenas carga la página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');

        if (!response.ok) {
          throw new Error('Error al conectar con el servidor');
        }

        const data = await response.json();
        setProducts(data); // Guardamos los pollos reales en el estado
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError('Hubo un problema cargando el menú. Intenta refrescar.');
      } finally {
        setLoading(false); // Terminamos de cargar (sea éxito o error)
      }
    };

    fetchProducts();
  }, []);

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

        {/* 5. Manejo de Estados de Carga y Error */}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-fire-orange animate-spin mb-4" />
            <p className="text-muted-foreground">Encendiendo el carbón...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
            <p className="text-sm text-gray-400 mt-2">Asegúrate de que el Backend (puerto 3001) esté encendido.</p>
          </div>
        )}

        {/* Products Grid - Ahora mapeamos los datos REALES */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  id={product.id.toString()} // Convertimos ID a string para el frontend
                  name={product.name}
                  description={product.description || ''} // Manejamos nulos
                  price={Number(product.price)} // <--- IMPORTANTE: Convertimos texto "58" a número 58
                  image={product.image || 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6'} // Imagen por defecto si no hay
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
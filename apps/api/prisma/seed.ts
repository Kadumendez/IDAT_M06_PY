import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚙️ Ejecutando seed...');

  // 1. Limpiar base de datos
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  console.log('📥 Insertando productos con imágenes personalizadas...');

  const products = [
    // --- BRASAS ---
    {
      name: 'Pollo a la Brasa Entero',
      description: 'Pollo entero marinado con nuestra receta secreta, papas fritas y ensalada.',
      price: 58.0,
      category: 'Brasas',
      image:
        'https://polleriaslagranja.com/wp-content/uploads/2022/10/La-Granja-Real-Food-Chicken-1-Pollo-a-la-Brasa-600x600.png',
    },
    {
      name: '1/2 Pollo a la Brasa',
      description: 'Medio pollo jugoso con papas fritas y ensalada fresca.',
      price: 32.0,
      category: 'Brasas',
      image:
        'https://polleriaslagranja.com/wp-content/uploads/2022/10/La-Granja-Real-Food-Chicken-1.2-Pollo-a-la-Brasa.png',
    },
    {
      name: '1/4 Pollo a la Brasa',
      description: 'Cuarto de pollo (pierna o pecho) con papas y cremas.',
      price: 18.0,
      category: 'Brasas',
      image:
        'https://polleriaslagranja.com/wp-content/uploads/2022/10/La-Granja-Real-Food-Chicken-1.4-de-Pollo-a-la-Brasa.png',
    },
    {
      name: 'Mostrito Clásico',
      description: '1/4 de pollo montado sobre arroz chaufa y papas fritas.',
      price: 24.0,
      category: 'Brasas',
      image:
        'https://www.donbelisario.com.pe/media/catalog/product/m/o/mostrito_personal.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg',
    },

    // --- PARRILLAS ---
    {
      name: 'Anticuchos de Corazón',
      description: '2 palos de puro corazón con papa dorada y choclo.',
      price: 22.0,
      category: 'Parrillas',
      image: 'https://perusumaq.com/wp-content/uploads/2018/06/anti1.jpg?w=1024',
    },
    {
      name: 'Parrilla Mixta Familiar',
      description: 'Chuleta, anticucho, rachi, pollo y chorizo.',
      price: 85.0,
      category: 'Parrillas',
      // Imagen mantenida de Unsplash
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    },
    {
      name: 'Costillas BBQ',
      description: 'Costillas de cerdo bañadas en salsa BBQ ahumada.',
      price: 38.0,
      category: 'Parrillas',
      image:
        'https://cdn0.uncomo.com/es/posts/3/9/5/como_hacer_costillas_bbq_en_sarten_50593_600_square.jpg',
    },

    // --- BEBIDAS ---
    {
      name: 'Inka Kola 1.5L',
      description: 'La bebida del sabor nacional.',
      price: 12.0,
      category: 'Bebidas',
      image: 'https://grupochios.com/wp-content/uploads/2022/02/inca-kola.jpg',
    },
    {
      name: 'Chicha Morada (Jarra)',
      description: 'Casera, hecha con maíz morado y piña.',
      price: 15.0,
      category: 'Bebidas',
      image: 'https://tofuu.getjusto.com/orioneat-local/resized2/GSvs9QzhNZPwFduu5-300-x.webp',
    },
    {
      name: 'Maracuyá Frozen',
      description: 'Refrescante bebida de pura fruta.',
      price: 16.0,
      category: 'Bebidas',
      // Imagen mantenida de Unsplash (genérica de bebida amarilla/naranja)
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Base de datos actualizada correctamente.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

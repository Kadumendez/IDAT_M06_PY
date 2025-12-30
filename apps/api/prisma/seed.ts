import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando sembrado de datos (Seeding)...')

    // 1. Limpiar datos viejos (para no duplicar si corres esto 2 veces)
    // Borramos primero OrderItem, luego Order y al final Product por las relaciones
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()

    // 2. Crear Productos (El Menú de Mr. Teo)
    const productos = await prisma.product.createMany({
        data: [
            {
                name: 'Pollo a la Brasa (1/4)',
                price: 24.90,
                image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
                category: 'Pollos',
                description: 'Cuarto de pollo con papas y ensalada.'
            },
            {
                name: 'Mostrito Clásico',
                price: 32.00,
                image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
                category: 'Pollos',
                description: '1/4 de pollo con arroz chaufa y papas.'
            },
            {
                name: 'Inka Kola 1.5L',
                price: 12.00,
                image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
                category: 'Bebidas',
                description: 'La bebida del sabor nacional.'
            },
            {
                name: 'Papas Fritas (Porción)',
                price: 15.00,
                image: 'https://images.unsplash.com/photo-1630384060421-a4323ceca041?auto=format&fit=crop&w=800&q=80',
                category: 'Guarniciones',
                description: 'Papas nativas fritas crujientes.'
            },
        ]
    })

    console.log(`✅ Base de datos llenada con éxito.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
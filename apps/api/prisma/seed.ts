import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando la siembra de datos...');

    // ----------------------------------------------
    // 1. PRIMERO: Asegurar de que exista un producto
    // ----------------------------------------------

    let pollo = await prisma.product.findFirst({
        where: { name: "Pollo a la Brasa" }
    });

    if (!pollo) {
        console.log('🍗 Creando Pollo a la Brasa...');
        pollo = await prisma.product.create({
            data: {
                name: "Pollo a la Brasa",
                description: "Clásico con papas y ensalada",
                price: 58.00,
                category: "Brasas",
                image: "https://ejemplo.com/pollo.jpg",
                available: true
            }
        });
    }

    // -------------------------------------
    // 2. SEGUNDO: Crear el Pedido de Prueba
    // -------------------------------------

    if (pollo) {
        console.log('🧾 Creando pedido para Juan Perez...');

        await prisma.order.create({
            data: {
                customerName: "Juan Perez",
                customerPhone: "999888777",
                total: 58.00, // Precio del pollo
                status: "PENDING",
                orderItems: {
                    create: [
                        {
                            quantity: 1,
                            price: 58.00,
                            productId: pollo.id
                        }
                    ]
                }
            }
        });
        console.log('✅ ¡Pedido creado con éxito!');
    }
}

// --------------------------------------------------------
// BOILERPLATE (Código necesario para ejecutar)
// --------------------------------------------------------
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
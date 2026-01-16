import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import productRoutes from './routes/products';
// import orderRoutes from './routes/orders';
import { CreateOrderSchema } from './schemas/order.schema';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. RUTA DE PRODUCTOS (Menú)
app.use('/products', productRoutes);

// 2. RUTA DE INICIO
app.get('/', (req, res) => {
    res.send('API de Mr. Teo funcionando 🚀');
});

// 3. RUTA PARA VER PEDIDOS (GET) <--- ¡ESTA ES LA QUE FALTABA!
app.get('/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { orderItems: true }, // Trae los platos
            orderBy: { createdAt: 'desc' } // Los nuevos primero
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al leer pedidos" });
    }
});

// 4. RUTA PARA CREAR PEDIDOS (POST)
app.post('/orders', async (req, res) => {
    try {
        console.log("Recibiendo pedido...", req.body);

        // Validar
        const cleanData = CreateOrderSchema.parse(req.body);

        // Guardar
        const newOrder = await prisma.order.create({
            data: {
                customerName: cleanData.customerName,
                customerPhone: cleanData.customerPhone,
                total: cleanData.total,
                status: "PENDING",
                orderItems: {
                    create: cleanData.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: { orderItems: true }
        });

        console.log("✅ Pedido guardado:", newOrder.id);
        res.json({ message: "¡Pedido registrado con éxito!", data: newOrder });

    } catch (error) {
        console.error("Error:", error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Datos inválidos", errors: error.errors });
        } else {
            res.status(500).json({ message: "Error interno" });
        }
    }
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /orders - Ver la lista de pedidos (Para el Dueño/Cocina)
router.get('/', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: true // <--- ¡Importante! Esto trae los platos de cada pedido
            },
            orderBy: {
                createdAt: 'desc' // Los más recientes primero
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
});

export default router;
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /products - Con filtro corregido ✅
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    const products = await prisma.product.findMany({
      where: category
        ? {
            category: String(category),
          }
        : {}, // <--- AQUÍ ESTÁ EL CAMBIO: Usamos {} en vez de undefined
      orderBy: {
        id: 'asc',
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

export default router;

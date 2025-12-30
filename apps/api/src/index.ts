import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import { CreateOrderSchema } from './schemas/order.schema';
import { z } from 'zod';



const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas           
app.use('/products', productRoutes); // <--- 2. USAR LA RUTA
app.use('/orders', orderRoutes);     // <--- 3. USAR LA RUTA

app.get('/', (req, res) => {
    res.send('API de Mr. Teo funcionando 🚀');
});

app.post('/orders', async (req, res) => {
    try {
        // 1. Zod valida los datos aquí. Si algo está mal, lanza error automáticamente.
        const cleanData = CreateOrderSchema.parse(req.body);

        // 2. Si pasa la validación, aquí guardaremos en la base de datos (Prisma)
        // (Esto lo conectaremos en el siguiente paso cuando enviemos el carrito)

        console.log("✅ Pedido válido recibido:", cleanData);

        res.json({ message: "Pedido validado correctamente", data: cleanData });

    } catch (error) {
        // Si Zod detecta un error, respondemos con código 400 (Bad Request)
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: "Datos inválidos",
                errors: error.errors.map(e => e.message) // Enviamos solo los mensajes amigables
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
});



app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
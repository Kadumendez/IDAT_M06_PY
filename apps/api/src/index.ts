import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

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

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
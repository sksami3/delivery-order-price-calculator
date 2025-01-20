import express from 'express';
import dotenv from 'dotenv';
import deliveryRoutes from './routes/deliveryRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/delivery-order-price', deliveryRoutes);

export default app;

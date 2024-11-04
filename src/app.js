import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import bookingRoutes from './routes/bookingRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/businesses', businessRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

// Eksportuokite `app`, bet nepaleiskite serverio
export default app;

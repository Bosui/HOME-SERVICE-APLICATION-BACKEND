import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js'; // Naujas importas
import bookingRoutes from './routes/bookingRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use((req, res, next) => {
    console.log(`Gauta užklausa: ${req.method} ${req.url}`);
    next(); // Tęsiama iki kito middleware arba maršruto
});

// Middleware, kuris gaudo SyntaxError netinkamo JSON atveju
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Netinkamas JSON:', err.message);
        return res.status(400).json({ error: 'Netinkamas JSON formatas' });
    }
    next();
});

// Prisijungimas prie MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Prisijungta prie MongoDB'))
    .catch(err => console.error('Klaida jungiantis prie MongoDB:', err));

// Maršrutai
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);

// Bendras klaidų gaudytojas
app.use(errorHandler);

export default app;

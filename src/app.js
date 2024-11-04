// app.js
import express from 'express';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(express.json());

// Route handlers
app.use('/api/categories', categoryRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

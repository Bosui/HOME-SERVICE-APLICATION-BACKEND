// server.js
import express from 'express';
import mongoose from 'mongoose';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection error:', error);
});

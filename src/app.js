// Failas: src/app.js
import express from 'express';
import router from './routes/routes.js'; // Patikrinkite, ar kelias ir importas teisingi

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Pridėkite šį maršrutų naudojimą:
app.use('/api', router); // '/api' - pagrindinis kelias

app.listen(PORT, () => {
    console.log(`Serveris veikia: http://localhost:${PORT}`);
});

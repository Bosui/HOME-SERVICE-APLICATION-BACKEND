// routes/businessRoutes.js
import express from 'express';
import {
    createBusiness,
    getAllBusinesses,
    getBookingsByDate,
    getBusinessById,
    getBusinessesByCategory,
    updateBusiness
} from '../controllers/BusinessController.js';

const router = express.Router();

// Middleware įvesties duomenų patikrai (jei reikia)
import { validateBusiness } from '../middlewares/validationMiddleware.js'; // Sukurkite šį middleware patikrai

// Maršrutai
router.get('/', getAllBusinesses);
router.get('/category/:category', getBusinessesByCategory);
router.get('/:id', getBusinessById);
router.post('/', validateBusiness, createBusiness); // Pridėta įvesties patikra prieš kuriant įmonę
router.put('/:id', validateBusiness, updateBusiness); // Pridėta įvesties patikra prieš atnaujinant įmonę
router.get('/:businessId/bookings/date/:date', getBookingsByDate);

export default router;

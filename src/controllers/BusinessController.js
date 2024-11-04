// controllers/BusinessController.js
import Business from '../models/Business.js';

// Gauna visas įmones
export const getAllBusinesses = async (req, res, next) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        next(new Error('Klaida gaunant įmonių sąrašą'));
    }
};

// Gauna visas įmones pagal kategoriją
export const getBusinessesByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        if (!category) {
            const error = new Error('Kategorija yra būtina');
            error.status = 400;
            return next(error);
        }
        const businesses = await Business.find({ category });
        res.status(200).json(businesses);
    } catch (error) {
        next(new Error('Klaida gaunant įmones pagal kategoriją'));
    }
};

// Gauna įmonę pagal ID
export const getBusinessById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const business = await Business.findById(id);
        if (!business) {
            const error = new Error('Įmonė nerasta');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(business);
    } catch (error) {
        next(new Error('Klaida gaunant įmonę pagal ID'));
    }
};

// Prideda naują įmonę
export const createBusiness = async (req, res, next) => {
    const { name, category, location, contactInfo } = req.body;
    if (!name || !category || !location || !contactInfo) {
        const error = new Error('Trūksta būtino lauko');
        error.status = 400;
        return next(error);
    }

    try {
        const newBusiness = new Business({ name, category, location, contactInfo });
        await newBusiness.save();
        res.status(201).json(newBusiness);
    } catch (error) {
        next(new Error('Klaida kuriant naują įmonę'));
    }
};

// Atnaujina įmonę pagal ID
export const updateBusiness = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBusiness = await Business.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBusiness) {
            const error = new Error('Įmonė nerasta');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(updatedBusiness);
    } catch (error) {
        next(new Error('Klaida atnaujinant įmonę'));
    }
};

// Gauna visus užsakymus konkrečiai įmonei nurodytą dieną
export const getBookingsByDate = async (req, res, next) => {
    try {
        const { businessId, date } = req.params;
        if (!businessId || !date) {
            const error = new Error('Trūksta įmonės ID arba datos');
            error.status = 400;
            return next(error);
        }
        const business = await Business.findById(businessId).populate({
            path: 'bookings',
            match: { date }
        });
        if (!business) {
            const error = new Error('Įmonė nerasta');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(business.bookings);
    } catch (error) {
        next(new Error('Klaida gaunant užsakymus pagal datą'));
    }
};

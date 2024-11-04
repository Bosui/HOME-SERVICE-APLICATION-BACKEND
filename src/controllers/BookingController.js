// controllers/BookingController.js
import Business from '../models/Business.js';

// Gauna visus užsakymus pagal vartotojo el. pašto adresą
export const getBookingsByUserEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const businesses = await Business.find({ 'bookings.customerName': email });
        const bookings = businesses.flatMap(business => 
            business.bookings.filter(booking => booking.customerName === email)
        );
        res.status(200).json(bookings);
    } catch (error) {
        next(new Error('Klaida gaunant užsakymus pagal el. pašto adresą'));
    }
};

// Sukuria naują užsakymą
export const createBooking = async (req, res, next) => {
    const { businessId, date, customerName, service } = req.body;
    if (!businessId || !date || !customerName || !service) {
        const error = new Error('Trūksta būtino lauko');
        error.status = 400;
        return next(error);
    }

    try {
        const business = await Business.findById(businessId);
        if (!business) {
            const error = new Error('Įmonė nerasta');
            error.status = 404;
            return next(error);
        }

        const newBooking = { date, customerName, service };
        business.bookings.push(newBooking);
        await business.save();

        res.status(201).json(newBooking);
    } catch (error) {
        next(new Error('Klaida kuriant užsakymą'));
    }
};

// Ištrina konkretų užsakymą pagal ID
export const deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const business = await Business.findOne({ 'bookings._id': id });

        if (!business) {
            const error = new Error('Užsakymas nerastas');
            error.status = 404;
            return next(error);
        }

        business.bookings.id(id).remove();
        await business.save();

        res.status(200).json({ message: 'Užsakymas sėkmingai ištrintas' });
    } catch (error) {
        next(new Error('Klaida ištrinant užsakymą'));
    }
};

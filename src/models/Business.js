// models/Business.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        required: true, 
        validate: {
            validator: (value) => !isNaN(Date.parse(value)),
            message: 'Nurodyta netinkama data'
        }
    },
    customerName: { 
        type: String, 
        required: true, 
        minlength: 2,
        maxlength: 100
    },
    service: { 
        type: String, 
        required: true, 
        minlength: 2,
        maxlength: 100
    }
});

const businessSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 100
    },
    category: { 
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 50
    },
    location: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 200
    },
    contactInfo: { 
        type: String, 
        required: true, 
        validate: {
            validator: function (v) {
                // Paprasta validacija el. paštui arba telefono numeriui
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^[0-9\-\+]{9,15}$/.test(v);
            },
            message: 'Nurodyti netinkami kontaktiniai duomenys'
        }
    },
    bookings: {
        type: [bookingSchema],
        validate: {
            validator: function (v) {
                return Array.isArray(v);
            },
            message: 'Užsakymai turi būti masyvas'
        }
    }
});

export default mongoose.model('Business', businessSchema);

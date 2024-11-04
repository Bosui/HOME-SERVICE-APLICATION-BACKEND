// __tests__/bookingRoutes.test.js
import request from 'supertest';
import app from '../app.js';

jest.setTimeout(20000); // 20 sekundžių laiko limitas visiems testams šiame faile

describe('Business Routes', () => {
    it('should retrieve all businesses', async () => {
        const response = await request(app).get('/api/businesses');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    // Kiti testai...

describe('Booking Routes', () => {
    it('should retrieve bookings by user email', async () => {
        const email = 'user@example.com';
        const response = await request(app).get(`/api/bookings/user/${email}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a new booking', async () => {
        const newBooking = {
            businessId: '64b329a7d1f5a123456789ab', // Replace with an actual business ID
            date: '2023-11-05',
            customerName: 'John Doe',
            service: 'Cleaning'
        };
        const response = await request(app).post('/api/bookings').send(newBooking);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('should delete a booking by ID', async () => {
        const bookingId = '64b329a7d1f5a123456789cd'; // Replace with an actual booking ID
        const response = await request(app).delete(`/api/bookings/${bookingId}`);
        expect([200, 404]).toContain(response.status);
    });
});
    });

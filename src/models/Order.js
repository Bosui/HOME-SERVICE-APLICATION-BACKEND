// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

// models/Company.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    contactPerson: { type: String },
    email: { type: String },
    photos: [{ type: String }]
});

const Company = mongoose.model('Company', companySchema);
export default Company;

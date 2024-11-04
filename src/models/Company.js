// models/Company.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  images: [{ type: String }],
});

export default mongoose.model('Company', companySchema);

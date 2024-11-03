// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    backgroundColor: { type: String },
    iconUrl: { type: String }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

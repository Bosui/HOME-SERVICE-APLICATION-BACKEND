// controllers/CategoryController.js
import Category from '../models/Category.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
};

export const createCategory = async (req, res) => {
    const { name, backgroundColor, iconUrl } = req.body;
    try {
        const newCategory = new Category({ name, backgroundColor, iconUrl });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

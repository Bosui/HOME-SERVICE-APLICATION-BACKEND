import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registracija
router.post('/register', async (req, res) => {
    console.log('Maršrutas /register pasiektas');
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'Vartotojas sukurtas sėkmingai' });
    } catch (error) {
        res.status(400).json({ error: 'Registracijos klaida', details: error.message });
    }
});

// Prisijungimas
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Vartotojas nerastas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Neteisingas slaptažodis' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Prisijungimo klaida', details: error.message });
    }
});

export default router;

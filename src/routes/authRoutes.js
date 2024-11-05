import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registracija
// Registracija
router.post('/register', async (req, res) => {
    console.log('Maršrutas /register pasiektas');
    try {
        const { username, email, password } = req.body;

        // Patikrina, ar visi laukai yra užpildyti
        if (!username || !email || !password) {
            console.log('Trūksta laukų registracijos metu');
            return res.status(400).json({ error: 'Visi laukai yra privalomi' });
        }

        // Patikrina, ar vartotojas jau egzistuoja
        console.log('Pradedamas vartotojo paieškos tikrinimas:', email);
        const existingUser = await User.findOne({ email });
        console.log('Vartotojo paieškos rezultatas:', existingUser);

        if (existingUser) {
            console.log('Vartotojas su šiuo el. paštu jau egzistuoja');
            return res.status(400).json({ error: 'Vartotojas su šiuo el. paštu jau egzistuoja' });
        }

        // Sukuria naują vartotoją (šifravimas atliekamas middleware)
        const user = new User({ username, email, password });
        await user.save();
        console.log('Vartotojas sėkmingai sukurtas:', user);

        res.status(201).json({ message: 'Vartotojas sukurtas sėkmingai' });
    } catch (error) {
        console.error('Klaida registracijos metu:', error);
        res.status(400).json({ error: 'Registracijos klaida', details: error.message });
    }
});

// Prisijungimas
router.post('/login', async (req, res) => {
    console.log('Maršrutas /login pasiektas');
    try {
        const { email, password } = req.body;

        // Patikrina, ar visi laukai yra užpildyti
        if (!email || !password) {
            console.log('Trūksta laukų prisijungimo metu');
            return res.status(400).json({ error: 'Visi laukai yra privalomi' });
        }

        // Randa vartotoją pagal el. paštą
        const user = await User.findOne({ email });
        console.log('Vartotojas pagal el. paštą:', user);
        if (!user) return res.status(400).json({ error: 'Vartotojas nerastas' });

        // Tikrina slaptažodį

        console.log('Slaptažodis iš užklausos:', password);
        console.log('Slaptažodis iš duomenų bazės:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Palyginimo rezultatas:', isMatch);

        if (!isMatch) return res.status(400).json({ error: 'Neteisingas slaptažodis' });

        // Generuoja JWT tokeną
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Sugeneruotas JWT tokenas:', token);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Klaida prisijungimo metu:', error);
        res.status(500).json({ error: 'Prisijungimo klaida', details: error.message });
    }
});

export default router;

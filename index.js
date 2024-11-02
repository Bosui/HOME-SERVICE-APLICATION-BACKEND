// File: /src/routes/index.js

import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Test route works!' });
});

export default router;

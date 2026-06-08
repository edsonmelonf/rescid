import express from 'express';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('categorias').select('*');
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json(data);
});

export default router;
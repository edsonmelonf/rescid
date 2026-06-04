import express from 'express';
import { supabase } from '../lib/supabase.js';
import 'dotenv/config';

const router = express.Router();

const INVITE_CODE = process.env.INVITE_CODE;

router.post('/register', async ( req, res) => {
    const { nameFull, email, password, inviteCode } = req.body;
    if (inviteCode !== INVITE_CODE) {
        return res.status(403).json({ message: 'Código de convite inválido' });
    } 
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nameFull,
                    perfil: 'gestor',
                }
            }
        });
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(201).json(data);  
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        }); 
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }  
});

export default router;     


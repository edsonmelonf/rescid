import express from 'express';
import { supabase, supabaseAuth } from '../lib/supabase.js';
import 'dotenv/config';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

const INVITE_CODE = process.env.INVITE_CODE;

router.post('/register', async (req, res) => {
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
        if (error) return res.status(400).json({ message: error.message });
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
        if (error) return res.status(400).json({ message: error.message });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/me', authenticate, (req, res) => {
    return res.status(200).json(req.user);
});

router.post('/logout', authenticate, async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) return res.status(400).json({ message: error.message });
        return res.status(200).json({ message: 'Logout bem-sucedido' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/me', authenticate, async (req, res) => {
    const { nome, email } = req.body;
    const client = supabaseAuth(req.token);

    const { error: sessionError } = await client.auth.setSession({
        access_token: req.token,
        refresh_token: req.token // não temos o refresh, mas é necessário passar algo
    });

    if (sessionError) return res.status(401).json({ message: sessionError.message });

    const { data, error } = await client.auth.updateUser({
        email,
        data: { nameFull: nome }
    });

    if (error) return res.status(400).json({ message: error.message });
    res.status(200).json(data.user);
});

export default router;
import express from 'express';
import { validate } from '../middlewares/validate.js';
import { initiativeSchema } from '../schemas/initiative.schema.js';
import { supabase } from '../lib/supabase.js';
import { authenticate } from '../middlewares/authenticate.js';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { categoria, titulo, meus } = req.query;
    let query = supabase.from('acoes').select('*');
    if (categoria) query = query.eq('categoria', categoria);
    if (titulo) query = query.ilike('titulo', `%${titulo}%`);
    
    // Se ?meus=true, filtra pelo usuário logado
    if (meus === 'true') {
        const token = req.headers.authorization?.split(' ')[1];
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('acoes').select('*').eq('id', id);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' });
    }
    res.status(200).json(data[0]);
});

router.post('/', authenticate, validate(initiativeSchema), async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const clienteAutenticado = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } }
    });

    const { data, error } = await clienteAutenticado.from('acoes').insert({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        cidade: req.body.cidade,
        horario: req.body.horario + ':00',
        estado: req.body.estado,
        bairro: req.body.bairro,
        numero: req.body.numero,
        rua: req.body.rua,
        complemento: req.body.complemento,
        imagem: req.body.imagemUrl,
        pix_email: req.body.pixEmail,
        data_acao: req.body.data_acao,
        cep: req.body.cep,
        user_id: req.user.id,
    }).select('*');

    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(201).json(data);
});

router.put('/:id', authenticate, validate(initiativeSchema), async (req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('acoes').update({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        cidade: req.body.cidade,
        estado: req.body.estado,
        bairro: req.body.bairro,
        numero: req.body.numero,
        rua: req.body.rua,
        complemento: req.body.complemento,
        imagem: req.body.imagemUrl,
        pix_email: req.body.pixEmail,
        data_acao: req.body.data_acao,
    }).eq('id', id).select('*');
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' });
    }
    res.status(200).json(data[0]);
});

router.delete('/:id', authenticate, async (req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('acoes').delete().select().eq('id', id);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' });
    }
    res.status(204).send();
});

export default router;
import express from 'express';
import { validate } from '../middlewares/validate.js';
import { initiativeSchema } from '../schemas/initiative.schema.js';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

router.post('/', validate(initiativeSchema), async (req, res) => {
    const { data, error } = await supabase.from('acoes').insert({
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
    }
    ).select('*');
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(201).json(data);
});

router.get('/', async (req, res) => {
    const { categoria, titulo } = req.query;
    let query = supabase.from('acoes').select('*');
    if (categoria) query = query.eq('categoria', categoria);
    if (titulo) query = query.ilike('titulo', `%${titulo}%`);
    const { data, error } = await query;
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json(data);
});

router.get('/:id', async(req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('acoes').select('*').eq('id', id)
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) { 
        return res.status(404).json({ message: 'Iniciativa não encontrada' })
    }
    res.status(200).json(data[0]);
}); 

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('acoes').delete().select().eq('id', id)
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' });
    }   
    res.status(204).send();
    
});

router.put('/:id', validate(initiativeSchema), async(req, res) => {
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

export default router;
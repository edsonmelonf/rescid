import express from 'express';
import { validate } from '../middlewares/validate.js';
import { supplierSchema } from '../schemas/supplier.schema.js';
import { supabase, supabaseAuth } from '../lib/supabase.js';

const router = express.Router();



router.post('/', validate(supplierSchema), async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = supabaseAuth(token);

    const { data, error } = await client.from('patrocinadores').insert({
        nome: req.body.nome,
        categoria: req.body.categoria,
        site: req.body.site,
        descricao: req.body.descricao,
        telefone: req.body.telefone,
        email: req.body.email,
    }).select('*');

    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(201).json(data);
});

router.get('/', async (req, res) => {
    const { categoria, cidade } = req.query;
    let query = supabase.from('patrocinadores').select('*');
    if (categoria) query = query.eq('categoria', categoria);
    if (cidade) query = query.eq('cidade', cidade);
    const { data, error } = await query;
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json(data);
});

router.get('/:id', async(req, res) => {
    const id = Number(req.params.id);
    const {data,error} = await supabase.from('patrocinadores').select('*').eq('id', id);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) { 
        return res.status(404).json({ message: 'Patrocinador não encontrado' })
    }
    res.status(200).json(data[0]);
}); 

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('patrocinadores').delete().select().eq('id', id);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Patrocinador não encontrado' });
    }   
    res.status(204).send();
    
});

router.put('/:id', validate(supplierSchema), async (req, res) => {
    const id = Number(req.params.id);
    const { data, error } = await supabase.from('patrocinadores').update({
        nome: req.body.nome,
        categoria: req.body.categoria,
        site: req.body.site,
        descricao: req.body.descricao,
        telefone: req.body.telefone,
        email: req.body.email,
    }).select().eq('id', id);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {

        return res.status(404).json({ message: 'Patrocinador não encontrado' });
    }
    res.status(200).json(data[0]);
}); 


export default router;
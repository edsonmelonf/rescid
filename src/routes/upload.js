import express from 'express';
import multer from 'multer';
import {supabase} from '../lib/supabase.js';

const router = express.Router();

const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.single('imagem'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: 'Nenhum arquivo enviado.'});
    }
    const originalName = `${Date.now()}-${req.file.originalname}`;
    const {data, error} = await supabase.storage
        .from('imagens-initiatives')
        .upload(originalName, req.file.buffer, {
            contentType: req.file.mimetype,
        });
    if (error) {
        return res.status(500).json({error: error.message});
    }
    const {data: urlData} = supabase.storage 
        .from('imagens-initiatives')
        .getPublicUrl(originalName);
    return res.status(200).json({url: urlData.publicUrl});
});

export default router;

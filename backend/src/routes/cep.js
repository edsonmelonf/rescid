import express from 'express';

const router = express.Router();

router.get('/:cep', async (req, res) => {
    const { cep } = req.params;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            return res.status(404).json({ message: 'CEP não encontrado' });
        }
        return res.json(data);
    }   catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
});

export default router;
    
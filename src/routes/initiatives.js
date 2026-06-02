import express from 'express';
import { validate } from '../middlewares/validate.js';
import { initiativeSchema } from '../schemas/initiative.schema.js';

const router = express.Router();

const initiatives  = [
  { id: 1, nome: "Sopão do Bom Samaritano", tipo: "grupo", categoria: "alimentação", bairro: "Aldeota", cidade: "Fortaleza" },
  { id: 2, nome: "Ação Agasalho CE", tipo: "acao", categoria: "vestuário", bairro: "Messejana", cidade: "Fortaleza" }
];

router.post('/', validate(initiativeSchema), (req, res) => {
    initiatives.push(req.body);
    res.status(201).json(initiatives);
});

router.get('/', (req, res) => {
    res.status(200).json(initiatives);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const initiative = initiatives.find(i => i.id === id);
    if (!initiative) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' })
    }
    res.status(200).json(initiative);
}); 

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = initiatives.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' })
    }
    initiatives.splice(index, 1);
    res.status(204).send();
    
});

router.put('/:id', validate(initiativeSchema), (req, res) => {
    const id = Number(req.params.id);
    const index = initiatives.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Iniciativa não encontrada' })
    }
    initiatives[index] = {...initiatives[index], ...req.body };
    res.status(200).json(initiatives[index]);
});

export default router;
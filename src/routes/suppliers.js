import express from 'express';
import { validate } from '../middlewares/validate.js';
import { supplierSchema } from '../schemas/supplier.schema.js';

const router = express.Router();

const suppliers = [
  { id: 1, nome: "Supermercado Lider", categoria: "alimentação", cidade: "Fortaleza", email: "contato@lider.com", telefone: "(85) 1234-5678" },
  { id: 2, nome: "NL Roupas", categoria: "vestuário", cidade: "Fortaleza", email: "contato@nlroupas.com", telefone: "(85) 8765-4321" }
];

router.post('/', validate(supplierSchema), (req, res) => {
    suppliers.push(req.body);
    res.status(201).json(suppliers);
});

router.get('/', (req, res) => {
    const { cidade, categoria } = req.query;
    const filteredSuppliers = suppliers.filter(s => { 
        if (categoria && s.categoria !== categoria) return false;
        if (cidade && s.cidade !== cidade) return false;
        return true;
    });
    res.status(200).json(filteredSuppliers);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const supplier = suppliers.find(s => s.id === id);
    if (!supplier) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' })
    }
    res.status(200).json(supplier);
}); 

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = suppliers.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' })
    }
    suppliers.splice(index, 1);
    res.status(204).send();
    
});

router.put('/:id', validate(supplierSchema), (req, res) => {
    const id = Number(req.params.id);
    const index = suppliers.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' })
    }
    suppliers[index] = {...suppliers[index], ...req.body };
    res.status(200).json(suppliers[index]);
});

export default router;
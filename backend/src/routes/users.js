import express from 'express';
import 'dotenv/config';

const router = express.Router();

const users = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', senha: '123456', perfil: 'gestor', cidade: 'Fortaleza' }
];

const INVITE_CODE = process.env.INVITE_CODE;

router.get('/', (req, res) => {
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.status(200).json(user);
});

router.post('/', (req, res) => {
  const { nome, email, senha, cidade, inviteCode } = req.body;
    if (inviteCode !== INVITE_CODE) {  
        return res.status(403).json({ message: 'Código de convite inválido' });
    }

    const newUser = {
        id: users.length + 1,
        nome,
        email,
        senha,
        perfil: 'gestor',
        cidade
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  users[index] = { ...users[index], ...req.body };
  res.status(200).json(users[index]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

export default router;

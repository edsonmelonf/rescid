import express from 'express';
import cors from 'cors'; // ← importação nova
import initiatives from './routes/initiatives.js';
import users from './routes/users.js';
import suppliers from './routes/suppliers.js';
import auth from './routes/auth.js';
import { authenticate } from './middlewares/authenticate.js';
import cep from './routes/cep.js';
import upload from './routes/upload.js';
import categorias from './routes/categorias.js';


const app = express();

// Configura quais endereços podem falar com o backend
// O Live Server abre em 127.0.0.1:5500 ou localhost:5500
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/initiatives',initiatives);
app.use('/users', authenticate, users);
app.use('/suppliers', authenticate, suppliers);
app.use('/auth', auth);
app.use('/cep', cep);
app.use('/upload', authenticate, upload);
app.use('/categorias', categorias);

export default app;
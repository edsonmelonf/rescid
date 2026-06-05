import express from 'express';
import initiatives  from './routes/initiatives.js';
import users from './routes/users.js';
import suppliers from './routes/suppliers.js';
import auth from './routes/auth.js';
import { authenticate } from './middlewares/authenticate.js';
import cep from './routes/cep.js';
import upload from './routes/upload.js';

const app = express();
app.use(express.json());
app.use('/initiatives', authenticate, initiatives);
app.use('/users', authenticate, users);
app.use('/suppliers', authenticate, suppliers);
app.use('/auth', auth);
app.use('/cep', cep);
app.use('/upload', authenticate, upload);

export default app;
import express from 'express';
import initiatives  from './routes/initiatives.js';
import users from './routes/users.js';
import suppliers from './routes/suppliers.js';
import auth from './routes/auth.js';

const app = express();
app.use(express.json());
app.use('/initiatives', initiatives);
app.use('/users', users);
app.use('/suppliers', suppliers);
app.use('/auth', auth);

export default app;
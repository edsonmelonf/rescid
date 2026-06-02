import express from 'express';
import initiatives  from './routes/initiatives.js';
import users from './routes/users.js';

const app = express();
app.use(express.json());
app.use('/initiatives', initiatives);
app.use('/users', users);

export default app;
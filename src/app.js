import express from 'express';
import initiatives  from './routes/initiatives.js';

const app = express();
app.use(express.json());
app.use('/initiatives', initiatives);

export default app;
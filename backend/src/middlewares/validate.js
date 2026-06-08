import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.issues.reduce((acc, e) => {
        const campo = e.path[0];
        const mensagem = e.message.includes('Invalid input')
          ? 'Campo obrigatório não preenchido'
          : e.message;
        acc[campo] = mensagem;
        return acc;
      }, {});

      return res.status(400).json({ errors });
    }
  }
};
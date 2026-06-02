import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map(e => 
          e.message.includes('Invalid input') 
            ? 'Campo obrigatório não preenchido' 
            : e.message
        )
      });
    }
  }
}
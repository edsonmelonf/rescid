import { z } from 'zod';

export const supplierSchema = z.object({
  nome:         z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
  categoria_id: z.number({ invalid_type_error: 'Selecione uma categoria' }),
  site:         z.string().url('O site precisa ser uma URL válida').optional(),
  descricao:    z.string().min(10, 'A descrição precisa ter pelo menos 10 caracteres'),
  email:        z.string().email('O email precisa ser um email válido'),
  telefone:     z.string().regex(/^\d{11}$/, 'O telefone deve conter exatamente 11 dígitos numéricos'),
});
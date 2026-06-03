import { z } from 'zod';

export const supplierSchema = z.object({
  nome: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
  categoria: z.string().min(1, 'A categoria precisa ter pelo menos 1 caractere'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  email: z.string().email('O email precisa ser um email válido'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
});
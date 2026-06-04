import { z } from 'zod';

export const initiativeSchema = z.object({
  titulo: z.string().min(3, 'O título precisa ter pelo menos 3 caracteres'),
  descricao: z.string().min(10, 'A descrição precisa ter pelo menos 10 caracteres'),
  data: z.string().min(1, 'Data é obrigatória'),
  horario: z.string().min(1, 'Horário é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  cep: z.string().min(8, 'CEP é obrigatório'),
  complemento: z.string().min(1, 'Complemento é obrigatório'),
  numero: z.string().optional(),
  estado: z.string().min(2, 'Estado é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  rua: z.string().min(1, 'Rua é obrigatória'),
  imagemUrl: z.string().optional(),
});
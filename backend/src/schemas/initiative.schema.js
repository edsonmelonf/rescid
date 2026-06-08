import { z } from 'zod';

export const initiativeSchema = z.object({
  titulo: z.string().min(3, 'O título precisa ter pelo menos 3 caracteres'),
  descricao: z.string().min(20, 'A descrição precisa ter pelo menos 20 caracteres').max(500, 'A descrição pode ter no máximo 500 caracteres'),
  data_acao: z.string().min(1, 'Data é obrigatória'),
  horario: z.string().min(1, 'Horário é obrigatório'),
  categoria_id: z.number({ required_error: 'Categoria é obrigatória' }).int().positive(),
  cep: z.string().min(8, 'CEP é obrigatório'),
  complemento: z.string().optional(),
  numero: z.string().optional(),
  estado: z.string().min(2, 'Estado é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  rua: z.string().min(1, 'Rua é obrigatória'),
  pixEmail: z.string().email('Email do Pix inválido'),
  imagemUrl: z.string({ required_error: 'Imagem é obrigatória' }).min(1, 'Imagem é obrigatória'),
});
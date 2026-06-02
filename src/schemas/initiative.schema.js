import { z } from 'zod';

export const initiativeSchema = z.object({
  titulo: z.string().min(3, 'O título precisa ter pelo menos 3 caracteres'),
  descricao: z.string().min(10, 'A descrição precisa ter pelo menos 10 caracteres'),
  data: z.string().min(1, 'Data é obrigatória'),
  horario: z.string().min(1, 'Horário é obrigatório'),
  estado: z.string().min(2, 'Estado é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  rua: z.string().min(1, 'Rua é obrigatória'),
  imagemUrl: z.string().url('A imagem precisa ser uma URL válida'),
});
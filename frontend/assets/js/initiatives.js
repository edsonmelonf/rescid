// frontend/js/initiatives.js

async function buscarIniciativas(filtros = {}) {
  // Monta os parâmetros de filtro na URL
  // Ex: /initiatives?categoria=voluntariado&titulo=ação
  const params = new URLSearchParams();

  if (filtros.categoria) params.append('categoria', filtros.categoria);
  if (filtros.titulo)    params.append('titulo', filtros.titulo);

  const query = params.toString();
  const endpoint = query ? `/initiatives?${query}` : '/initiatives';

  // Busca da API — true significa que envia o token (rota autenticada)
  const data = await request(endpoint, 'GET', null, false);
  return data;
}
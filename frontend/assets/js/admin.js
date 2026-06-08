// frontend/assets/js/admin.js

async function buscarAcoesAdmin() {
  return await request('/initiatives?meus=true', 'GET', null, true);
}

async function criarAcao(dados) {
  return await request('/initiatives', 'POST', dados, true);
}

async function deletarAcao(id) {
  return await request(`/initiatives/${id}`, 'DELETE', null, true);
}

async function uploadImagem(arquivo) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const formData = new FormData();
  formData.append('imagem', arquivo);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao fazer upload da imagem');
  }

  return data.url;
}
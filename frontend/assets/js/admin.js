// frontend/js/admin.js

async function buscarAcoesAdmin() {
  return await request('/initiatives', 'GET', null, true);
}

async function criarAcao(dados) {
  return await request('/initiatives', 'POST', dados, true);
}

async function deletarAcao(id) {
  return await request(`/initiatives/${id}`, 'DELETE', null, true);
}

// ── NOVA FUNÇÃO ─────────────────────────────────────────
async function uploadImagem(arquivo) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // FormData é o formato correto para enviar arquivos
  const formData = new FormData();
  formData.append('imagem', arquivo); // 'imagem' é o nome que o backend espera

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      // Não coloca Content-Type aqui — o navegador define sozinho para FormData
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao fazer upload da imagem');
  }

  return data.url; // retorna a URL pública da imagem
}
const API_URL = 'http://localhost:3000';

async function request(endpoint, method = 'GET', body = null, auth = false) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
      // Se vier lista de erros do Zod, junta em uma mensagem só
      if (data.errors && Array.isArray(data.errors)) {
        throw new Error(data.errors.join('\n'));
      }
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error(`Erro em ${method} ${endpoint}:`, error.message);
    throw error;
  }
}
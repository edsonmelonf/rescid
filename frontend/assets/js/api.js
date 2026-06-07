// frontend/js/api.js

// URL base do backend
// Durante desenvolvimento, o backend roda local
const API_URL = 'http://localhost:3000';

async function request(endpoint, method = 'GET', body = null, auth = false) {
  const headers = { 'Content-Type': 'application/json' };

  // Se a rota precisa de token, busca o que foi salvo no login
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
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error(`Erro em ${method} ${endpoint}:`, error.message);
    throw error;
  }
}
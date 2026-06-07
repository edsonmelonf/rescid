// frontend/js/auth.js

async function login(email, password) {
  // Chama POST /auth/login
  // O backend espera exatamente "email" e "password"
  const data = await request('/auth/login', 'POST', { email, password });

  // O Supabase devolve { session: { access_token }, user: {...} }
  // Guardamos o token para usar nas próximas requisições
  const token = data.session.access_token;
  localStorage.setItem('token', token);

  // Guardamos também os dados básicos do usuário (opcional, mas útil)
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
}

async function cadastrar(nameFull, email, password, inviteCode) {
  // Chama POST /auth/register
  // Atenção: o backend espera "nameFull", não "nome"
  const data = await request('/auth/register', 'POST', {
    nameFull,
    email,
    password,
    inviteCode
  });
  return data;
}

async function logout() {
  // Limpa os dados salvos localmente
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}
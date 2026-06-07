// frontend/js/suppliers.js

async function buscarPatrocinadores() {
  return await request('/suppliers', 'GET', null, true);
}

async function criarPatrocinador(dados) {
  return await request('/suppliers', 'POST', dados, true);
}

async function deletarPatrocinador(id) {
  return await request(`/suppliers/${id}`, 'DELETE', null, true);
}
const API_URL = 'http://localhost:3001';

//funcao para fazer login

async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password })
    });
    return response.json();
}

//funcao para registrar usuario

async function registrar(dados) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    return response.json();
}

// salvar o token do navegador

function salvarToken(token, nome, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    if (email) {
        localStorage.setItem('email', email);
    }

}

//obter o token do navegador

function getToken() {
    return localStorage.getItem('token');
}

//verificar se o usuario esta logado

function estaLogado() {
    return !!getToken('token');
}

// fazer logout do usuario

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    window.location.href = 'login.html';
}

// fazer requisicoes autenticadas para a API
async function authFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });
}


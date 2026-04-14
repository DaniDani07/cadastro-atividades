const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extrai o token

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'chave-secreta');
        req.usuario = decoded; // Armazena os dados do usuario no objeto de requisição
        next(); // Continua para a proxima rota
    }
    catch (error) {
     res.status(403).json({ erro: 'Token inválido' });
    }
};
module.exports = autenticarToken;
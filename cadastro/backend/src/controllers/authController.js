const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Pessoa = require('../models/Pessoa');
const sequelize = require('../database');

//Registrar um novo usuário
// Registrar um novo usuario
const register = async (req, res) => {

    try {
        const {
            nome,
            email,
            senha,
            telefone,
            rua,
            numero_da_casa,
            bairro,
            cidade,
            complemento
        } = req.body;

        // Verificar se o email já está registrado
        // Verifica se o email ja esta em uso
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Email já registrado' });
        }
    
        // Valida os campos obrigatorios do cadastro e do perfil
        const camposObrigatorios = [nome, email, senha, telefone, rua, numero_da_casa, bairro, cidade];
        if (camposObrigatorios.some((campo) => !campo)) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatorios' });
        }

        // Hash da senha

        // Cria a conta de acesso e o perfil juntos
        const hashSenha = await bcrypt.hash(senha, 10);

        await sequelize.transaction(async (transaction) => {
            const usuario = await Usuario.create(
                { email, senha: hashSenha },
                { transaction }
            );

            await Pessoa.create(
                {
                    usuarioId: usuario.id,
                    nome,
                    telefone,
                    rua,
                    numero_da_casa,
                    bairro,
                    cidade,
                    complemento
                },
                { transaction }
            );
        });
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.log('ERRO AO REGISTRAR:', error); 
        res.status(500).json({ erro: 'Erro ao registrar usuário' });
    }
};

//Login
// Login do usuario
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Busca o usuario pelo email
        // Busca a conta de acesso pelo email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ message: 'Email ou senha incorretos' });
        }

        // Verificar a senha
        // Valida a senha informada
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Email ou senha incorretos' });
        }

        // Gerar token JWT
        // Busca o perfil vinculado para devolver o nome na sessao
        const pessoa = await Pessoa.findOne({
            where: { usuarioId: usuario.id }
        });

        // Gera o token da sessao autenticada
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                nome: pessoa ? pessoa.nome : 'Usuario'
            },
            'chave-secreta',
            { expiresIn: '8h' }
        );
        res.json({ token, nome: pessoa ? pessoa.nome : 'Usuario', email: usuario.email });

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao fazer login' });
    }
};

module.exports = { register, login };

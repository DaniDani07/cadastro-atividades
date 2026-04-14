const Atividade = require('../models/Atividade');
const Pessoa = require('../models/Pessoa');
const Usuario = require('../models/Usuario');

async function buscarPessoaDoUsuario(req) {
    const usuario = await Usuario.findByPk(req.usuario.id);

    if (!usuario) {
        return null;
    }

    return Pessoa.findOne({
        where: { usuarioId: usuario.id }
    });
}

// Listar somente as atividades do usuario logado
const listarAtividades = async (req, res) => {
    try {
        const pessoa = await buscarPessoaDoUsuario(req);
        if (!pessoa) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }

        const limit = Number(req.query.limit);
        const atividades = await Atividade.findAll({
            where: { pessoaId: pessoa.id },
            include: [{ model: Pessoa, attributes: ['nome'] }],
            order: [['dataInicio', 'DESC']],
            ...(Number.isFinite(limit) && limit > 0 ? { limit } : {})
        });
        res.json(atividades);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar atividades' });
    } 
};

// Criar uma nova atividade para o usuario logado
const criarAtividade = async (req, res) => {
    try {
        const pessoa = await buscarPessoaDoUsuario(req);
    
        const { nome, descricao, dataInicio, dataTermino } = req.body;

        if (!pessoa) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }

        const atividade = await Atividade.create({
            nome,
            descricao,
            dataInicio,
            dataTermino,
            pessoaId: pessoa.id
        });
        res.status(201).json(atividade);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar atividade' });
    }
};

// Buscar uma atividade especifica do usuario logado
const buscarAtividadePorId = async (req, res) => {
    try {
        const pessoa = await buscarPessoaDoUsuario(req);
        if (!pessoa) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }

        const atividade = await Atividade.findOne({
            where: {
                id: req.params.id,
                pessoaId: pessoa.id
            },
            include: [{ model: Pessoa, attributes: ['nome'] }]
        });
        if (!atividade) {
            return res.status(404).json({ message: 'Atividade não encontrada' });
        }
        res.json(atividade);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar atividade' });
    }
};

// Editar uma atividade do usuario logado
const editarAtividade = async (req, res) => {
    try {
        const pessoa = await buscarPessoaDoUsuario(req);
        if (!pessoa) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }

        const atividade = await Atividade.findOne({
            where: {
                id: req.params.id,
                pessoaId: pessoa.id
            }
        });
        if (!atividade) {
            return res.status(404).json({ message: 'Atividade não encontrada' });
        }
        const { nome, descricao, dataInicio, dataTermino, status } = req.body;
        await atividade.update({ nome, descricao, dataInicio, dataTermino, status });
        res.json(atividade);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao editar atividade' });
    }
};

// Deletar uma atividade do usuario logado
const deletarAtividade = async (req, res) => {
    try {
        const pessoa = await buscarPessoaDoUsuario(req);
        if (!pessoa) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }

        const atividade = await Atividade.findOne({
            where: {
                id: req.params.id,
                pessoaId: pessoa.id
            }
        });
        if (!atividade) {
            return res.status(404).json({ message: 'Atividade não encontrada' });
        }
        await atividade.destroy();
        res.json({ message: 'Atividade deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar atividade' });
    }
};

module.exports = { listarAtividades, criarAtividade, buscarAtividadePorId, editarAtividade, deletarAtividade };

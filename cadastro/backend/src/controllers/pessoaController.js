const Pessoa = require('../models/Pessoa');

const Usuario = require('../models/Usuario');

async function buscarPerfil(req) {
    const usuario = await Usuario.findByPk(req.usuario.id);

    if (!usuario) {
        return { usuario: null, pessoa: null };
    }

    const pessoa = await Pessoa.findOne({
        where: { usuarioId: usuario.id }
    });

    return { usuario, pessoa };
}

// Monta a resposta unindo os dados de acesso e de perfil
function montarRespostaPerfil(usuario, pessoa) {
    return {
        id: pessoa.id,
        usuarioId: pessoa.usuarioId,
        nome: pessoa.nome,
        email: usuario.email,
        telefone: pessoa.telefone,
        rua: pessoa.rua,
        numero_da_casa: pessoa.numero_da_casa,
        bairro: pessoa.bairro,
        cidade: pessoa.cidade,
        complemento: pessoa.complemento
    };
}

// Buscar o perfil do usuario logado
const buscarMeuPerfil = async (req, res) => {
    try {
        const { usuario, pessoa } = await buscarPerfil(req);

        if (!usuario || !pessoa) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }

        res.json(montarRespostaPerfil(usuario, pessoa));
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar perfil' });
    }
};

// Atualizar o perfil do usuario logado
const atualizarMeuPerfil = async (req, res) => {
    try {
        const { usuario, pessoa } = await buscarPerfil(req);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuario nao encontrado' });
        }

        // Atualiza apenas os dados do perfil, sem mexer no email de login
        const { nome, telefone, rua, numero_da_casa, bairro, cidade, complemento } = req.body;
        const dadosPerfil = {
            usuarioId: usuario.id,
            nome,
            telefone,
            rua,
            numero_da_casa,
            bairro,
            cidade,
            complemento
        };

        let perfilAtualizado = pessoa;

        if (!perfilAtualizado) {
            perfilAtualizado = await Pessoa.create(dadosPerfil);
        } else {
            await perfilAtualizado.update(dadosPerfil);
        }

        res.json(montarRespostaPerfil(usuario, perfilAtualizado));
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar perfil' });
    }
};

module.exports = { buscarMeuPerfil, atualizarMeuPerfil };

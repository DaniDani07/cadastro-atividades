const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Pessoa = require('./Pessoa');

const Atividade = sequelize.define('Atividade', {

    nome: {
        type : DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type : DataTypes.TEXT,
        allowNull: false
    },

    dataInicio: { 
        type : DataTypes.DATE,
        allowNull: false
    },

    dataTermino: {
        type : DataTypes.DATE,
        allowNull: false
    },

    pessoaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pessoa,
            key: 'id'
        }
    },

    status:{ 
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue: 'aberta'
    }

});

// Define a associação entre Atividade e Pessoa
Atividade.belongsTo(Pessoa, { foreignKey: 'pessoaId' });
Pessoa.hasMany(Atividade, { foreignKey: 'pessoaId' });

module.exports = Atividade;
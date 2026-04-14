const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./Usuario');

const Pessoa = sequelize.define('Pessoa', {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Usuario,
            key: 'id'
        }
    },

    nome: {
        type : DataTypes.STRING,
        allowNull: false
    },

    telefone: {
        type : DataTypes.STRING,
        allowNull: false
    },

    rua: {
        type : DataTypes.STRING,
        allowNull: false
    },

    numero_da_casa: {
        type : DataTypes.STRING,
        allowNull: false
    },

    bairro: {
        type : DataTypes.STRING,
        allowNull: false
    },

    cidade: { 
        type : DataTypes.STRING,
        allowNull: false
    },  

    complemento: {
        type : DataTypes.STRING,
        allowNull: true
    }


});

Pessoa.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasOne(Pessoa, { foreignKey: 'usuarioId' });

module.exports = Pessoa;

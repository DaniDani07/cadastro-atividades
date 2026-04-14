const app = require('./src/app');
const sequelize = require('./src/database');

// Importa os modelos para o Sequelize reconhecer as tabelas
require('./src/models/Usuario');
require('./src/models/Pessoa');
require('./src/models/Atividade');

const PORT = 3001;

sequelize.sync({ force: false })
    .then(() => {
      console.log('Banco de dados sincronizado');
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Erro ao sincronizar o banco de dados:', error);
    });

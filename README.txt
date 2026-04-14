Sistema de cadastro e gerenciamento de atividades

Sistema web para cadastro de usuários e gerenciamento de atividades pessoais. Cada usuário possui um perfil próprio e gerencia somente suas próprias atividades.

Como executar o projeto:

#Requisitos:

- Node.js versão 18 ou superior
- Navegador moderno

1- Clone o repositório:

2- Instale as dependências e inicie o servidor:

- cd cadastro/backend
- npm install
- npm run dev

3- acesso ao sistema:

Abra o navegador e acesse: 

http://localhost:3001

O sistema irá abrir automaticamente na tela de login.
O banco de dados SQLite é criado automaticamente na inicialização do sistema na primeira execução, não sendo necessário instalar nenhum banco separado.

Funcionalidades:

Autenticação:
- Cadastro de conta com perfil completo
- Login com email e senha
- Sessão autenticada via token JWT com validade de 8 horas 
- Logout com limpeza de sessão

Perfil do usuário:
- Visualização e edição dos dados pessoais 
- email de acesso é fixado não podendo ser alterado

Atividades:
- Cadastro de atividades vinculadas ao usuário logado
- Listagem das atividades com data de início, término e data de criação 
- Mudança de status da atividade
- Edição e exclusão de atividades 
- Cada usuário visualiza e gerencia somente suas próprias atividades

Dashboard:
- Exibe as atividades recentes 
- acesso ao "Meu perfil" e "Atividades"

Requisitos Funcionais:
- O usuário pode criar uma conta com dados de acesso e perfil
- O usuário pode fazer login com e-mail e senha 
- Somente usuários autenticados acessam as funcionalidades do sistema
- O usuário visualiza e edita apenas o próprio perfil
- O usuário cadastra, edita e exclui apenas suas próprias atividades
- Exibe todos os detalhes da atividade

Requisitos não funcionais:
- Autenticação via JWT
- Senhas armazenadas com criptografia bcryptjs 
- Validação de senha ( mínimo 6 caracteres com letras e números)
- Banco de dados SQLite gerenciado via Sequelize
- API REST com Node.js e Express
- Frontend em HTML, CSS e JavaScript puro
- Código organizado em camadas: controllers, models, routes e middlewares

Decisões técnicas:

- O teste solicitava Angular com NgZorro, mas, optei por HTML, CSS E Javascript devido ao prazo de entrega e ao nível de experiencia com a framework, essa decisão permitiu entregar um sistema funcional e estruturado, dentro do prazo disponível, mas, compreendo que o ideal seria Angular.

- O SQLite foi escolhido por não exigir uma instalação ou configuração extra, facilitando uma execução em qualquer máquina.

- O Express serve os arquivos estáticos do frontend diretamente

- A conta de acesso (Usuário) armazena apenas dados de login. os dados pessoais ficam em um modelo separado(Pessoa), vinculado ao usuário por chave estrangeira.

-Testes unitários não foram implementados devido ao prazo e ao nível inicial de experiência, mas, é algo a ser evoluído ainda.

Tecnologias utilizadas:

- Node.js
- Express
- Sequelize (ORM)
- SQLite
- JWT
- bcryptjs
- HTML5
- CSS
- JavaScript
- Bootstrap Icons



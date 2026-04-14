const express = require('express');
const router = express.Router();
const { buscarMeuPerfil, atualizarMeuPerfil } = require('../controllers/pessoaController');
const autenticar = require('../middlewares/auth');

router.get('/me', autenticar, buscarMeuPerfil);
router.put('/me', autenticar, atualizarMeuPerfil);

module.exports = router;

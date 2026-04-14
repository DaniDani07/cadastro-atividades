const express = require('express');
const router = express.Router();
const { listarAtividades, criarAtividade, buscarAtividadePorId, editarAtividade, deletarAtividade} = require('../controllers/atividadeController');
const autenticar = require('../middlewares/auth');

router.get('/', autenticar, listarAtividades);
router.post('/', autenticar, criarAtividade);
router.get('/:id', autenticar, buscarAtividadePorId);
router.put('/:id', autenticar, editarAtividade);
router.delete('/:id', autenticar, deletarAtividade);

module.exports = router;
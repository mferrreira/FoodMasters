const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const LoginController = require('../controllers/loginController');

// Middleware para autenticação
router.use(LoginController.authenticateToken);

router.post('/', async (req, res) => {
    await ProdutoController.create(req, res);
});

router.put('/:codigo_barras', async (req, res) => {
    await ProdutoController.update(req, res);
});

router.delete('/:codigo_barras', async (req, res) => {
    await ProdutoController.delete(req, res);
});

router.get('/:codigo_barras', async (req, res) => {
    await ProdutoController.getProduto(req, res);
});

router.get('/', async (req, res) => {
    await ProdutoController.listarTodosProdutos(req, res);
});

router.post('/:codigo_barras/categoria/:categoriaId', async (req, res) => {
    await ProdutoController.associarCategoria(req, res);
});

module.exports = router;

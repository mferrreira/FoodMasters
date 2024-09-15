const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const LoginController = require('../controllers/loginController');

// Middleware para autenticação
//router.use(LoginController.authenticateToken);

// Rota para criar um novo produto

router.post('/', async (req, res) => {
    await ProdutoController.create(req, res);
});

router.put('/:codigoBarras', async (req, res) => {
    await ProdutoController.update(req, res);
});

router.delete('/:codigoBarras', async (req, res) => {
    await ProdutoController.delete(req, res);
});

router.get('/:codigoBarras', async (req, res) => {
    await ProdutoController.getProduto(req, res);
});

router.get('/', async (req, res) => {
    await ProdutoController.listarTodosProdutos(req, res);
});

router.post('/:codigoBarras/categoria/:categoriaId', async (req, res) => {
    await ProdutoController.associarCategoria(req, res);
});

module.exports = router;

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

// Rota para atualizar um produto existente
router.put('/:codigoBarras', async (req, res) => {
    await ProdutoController.update(req, res);
});

// Rota para deletar um produto existente
router.delete('/:codigoBarras', async (req, res) => {
    await ProdutoController.delete(req, res);
});

// Rota para obter um produto específico
router.get('/:codigoBarras', async (req, res) => {
    await ProdutoController.getProduto(req, res);
});

// Rota para obter todos os produtos
router.get('/', async (req, res) => {
    await ProdutoController.listarTodosProdutos(req, res);
});

// Rota para associar um produto a uma categoria
router.post('/:codigoBarras/categoria/:categoriaId', async (req, res) => {
    await ProdutoController.associarCategoria(req, res);
});

module.exports = router;

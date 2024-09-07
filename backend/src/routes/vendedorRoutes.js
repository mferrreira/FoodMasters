const express = require('express');
const router = express.Router();
const VendedorController = require('../controllers/vendedorController');
const LoginController = require('../controllers/loginController');

// Middleware para autenticação
router.use(LoginController.authenticateToken);

// Rota para realizar uma venda
router.post('/vendas', VendedorController.realizarVenda);

// Rota para visualizar uma venda específica
router.get('/vendas/:numeroPedido', VendedorController.visualizarVenda);

// Rota para consultar todos os produtos
router.get('/produtos', VendedorController.consultarProdutos);

// Rota para gerar recibo de uma venda específica
router.get('/vendas/:numeroPedido/recibo', VendedorController.gerarRecibo);

module.exports = router;

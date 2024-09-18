const express = require('express');
const router = express.Router();
const VendedorController = require('../controllers/vendedorController');
const LoginController = require('../controllers/loginController');

// autenticação
//router.use(LoginController.authenticateToken);

// realizar  venda
router.post('/vendas', VendedorController.realizarVenda);

// visualizar venda específica
router.get('/vendas/:numeroPedido', VendedorController.visualizarVenda);

// consultar todos os produtos
router.get('/produtos', VendedorController.consultarProdutos);

// gerar recibo de venda específica
router.get('/vendas/:numeroPedido/recibo', VendedorController.gerarRecibo);

module.exports = router;

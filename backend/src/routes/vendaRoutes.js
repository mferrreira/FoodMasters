const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/vendaController');
const LoginController = require('../controllers/loginController');

// Middleware para autenticação
router.use(LoginController.authenticateToken);

// Rota para criar uma nova venda
router.post('/', async (req, res) => {
    await VendaController.createVenda(req, res);
});

// Rota para atualizar uma venda existente
router.put('/:numeroPedido', async (req, res) => {
    await VendaController.updateVenda(req, res);
});

// Rota para deletar uma venda existente
router.delete('/:numeroPedido', async (req, res) => {
    await VendaController.deleteVenda(req, res);
});

// Rota para obter uma venda específica
router.get('/:numeroPedido', async (req, res) => {
    await VendaController.getVenda(req, res);
});

// Rota para obter todas as vendas
router.get('/', async (req, res) => {
    await VendaController.getTodasVendas(req, res);
});

// Rota para gerar um recibo para uma venda específica
router.get('/:numeroPedido/recibo', async (req, res) => {
    await VendaController.gerarRecibo(req, res);
});

router.get('/top/produto', async (req, res) => {
    console.log('chegou aqui')
    VendaController.getProdutosMaisVendidos(req, res)
});

router.get('/top/vendedor', VendaController.getVendedoresMaisAtivos);


module.exports = router;

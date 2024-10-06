const express = require('express');
const router = express.Router();
const GerenteController = require('../controllers/gerenteController');
const LoginController = require('../controllers/loginController');

// Middleware para autenticação
router.use(LoginController.authenticateToken);

// Adiciona um novo produto
router.post('/produtos', (req, res) => {
    GerenteController.addProduto(req, res);
});

// Remove um produto
router.delete('/produtos', (req, res) => {
    GerenteController.removeProduto(req, res);
});

// Atualiza um produto
router.put('/produtos', (req, res) => {
    GerenteController.editProduto(req, res);
});

// Lista todos os produtos
router.get('/produtos', (req, res) => {
    GerenteController.listProdutos(req, res);
});

// Retorna um produto específico
router.get('/produto/:id', (req, res) => {
    GerenteController.getProdutoPorCodigo(req, res);
});


// Adiciona um novo vendedor
router.post('/vendedores', (req, res) => {
    GerenteController.addVendedor(req, res);
});

// Remove um vendedor
router.delete('/vendedores/:cpf_cnpj', (req, res) => {
    GerenteController.removeVendedor(req, res);
});

// Atualiza um vendedor
router.put('/vendedores', (req, res) => {
    GerenteController.editVendedor(req, res);
});

// Lista todos os vendedores
router.get('/vendedores', (req, res) => {
    GerenteController.listVendedores(req, res);
});

// Retorna um vendedor específico
router.get('/vendedor/:id', (req, res) => {
    GerenteController.getVendedor(req, res);
})

// Lista todas as vendas
router.get('/vendas', (req, res) => {
    GerenteController.listVendas(req, res);
});

// Gera relatório
router.get('/relatorio', (req, res) => {
    GerenteController.gerarRelatorio(req, res);
});

module.exports = router;

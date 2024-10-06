const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginController');

// Rota para login
router.post('/', LoginController.login);

// Rota para testar o acesso protegido (autenticação)
router.get('/protected', LoginController.authenticateToken, (req, res) => {
    res.status(200).json({ message: "Acesso autorizado!" });
});

module.exports = router;

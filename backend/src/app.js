const express = require('express');
const cors = require('cors');

const LoginRoutes = require('./routes/loginRoute');
const ProdutoRoutes = require('./routes/produtoRoutes');
const GerenteRoutes = require('./routes/gerenteRoutes');
const VendedorRoutes = require('./routes/vendedorRoutes');
const VendaRoutes = require('./routes/vendaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/products', ProdutoRoutes);
app.use('/api/users/manager', GerenteRoutes);
app.use('/api/users/salesman', VendedorRoutes);
app.use('/api/sales', VendaRoutes);
//app.use('/login', LoginRoutes);

module.exports = app;

const express = require('express');

const LoginRoutes = require('./routes/loginRoute');

const app = express();

app.use(express.json());

// Rotas
app.use('/api/products', ()=>{});
app.use('/api/users/manager', ()=>{});
app.use('/api/users/salesman', ()=>{});
app.use('/api/sales', ()=>{});
app.use('/login', LoginRoutes);

module.exports = app;
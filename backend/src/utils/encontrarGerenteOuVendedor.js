const prisma = require('../services/prismaClient');
const Gerente = require('../models/Gerente')
const Vendedor = require('../models/Vendedor')

async function encontrarGerenteOuVendedor(cpf) {
        try {
            const user = await prisma.usuario.findUnique({ where: {cpf_cnpj: cpf}});
            if (user.is_vendedor === true) 
                return new Vendedor(...Object.values(user));
            else
                return new Gerente(...Object.values(user));
        } catch (e) {
            throw new Error('Erro ao buscar usuário ' + e.message);
        }
}

module.exports = encontrarGerenteOuVendedor;
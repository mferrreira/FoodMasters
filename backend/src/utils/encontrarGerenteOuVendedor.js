const prisma = require('../services/prismaClient');
const Gerente = require('../models/Gerente')
const Vendedor = require('../models/Vendedor')

async function encontrarGerenteOuVendedor(cpf) {
        try {
            const user = await prisma.usuario.findUnique({ where: {cpf_cnpj: cpf}});
            if (user.is_vendedor === true) 
                return new Vendedor(user.cpf_cnpj, user.nome_completo, user.email, user.senha, user.data_nascimento, user.rg, user.endereco, user.telefone, user.data_admissao, user.salario, user.status, user.setor);
            else if(!user.is_vendedor)
                return new Gerente(user.cpf_cnpj, user.nome_completo, user.email, user.senha, user.data_nascimento, user.rg, user.endereco, user.telefone, user.data_admissao, user.salario, user.status, user.setor);
            else
                return false;
        } catch (e) {
            throw new Error('Erro ao buscar usuário ' + e.message);
        }

}

module.exports = encontrarGerenteOuVendedor;
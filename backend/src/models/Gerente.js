const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Vendedor = require('./Vendedor');
const Venda = require('./Venda');
const Categoria = require('./Categoria');
const prisma = require('../services/prismaClient');

class Gerente extends Usuario {

    constructor(cpf, nomeCompleto, email, senha, dataNascimento, rg, endereco, telefone, dataAdmissao, salario, status, setor) {
        super(cpf, nomeCompleto, email, senha,dataNascimento, rg, endereco, telefone, dataAdmissao, salario, status, setor);
    }


    // CRUD Produtos
    async listarTodosProdutos() {
        return await Produto.listarTodosProdutos();
    }

    async obterProduto(codigoBarras) {
        return await Produto.getProdutoPorCodigo(codigoBarras);
    }

    async adicionarProduto(...dadosProduto) {
        const produto = new Produto(...dadosProduto);
        return await produto.save();
    }

    async atualizarProduto(codigoBarras, novosDados) {
        const produto = new Produto(codigoBarras, ...Object.values(novosDados));
        return await produto.update(codigoBarras, novosDados);
    }

    async removerProduto(codigoBarras) {
        const produto = new Produto(codigoBarras);
        return await produto.delete(codigoBarras);
    }

    // CRUD Vendedores
    async listarTodosVendedores() {
        return await prisma.usuario.findMany();
    }

    async obterVendedor(cpf) {
        return await prisma.usuario.findUnique({ where: { cpf_cnpj: cpf } });
    }

    async adicionarVendedor( ...dadosVendedor ) {
        try {
            await new Vendedor(...dadosVendedor).save(true)
            return true
        } catch(e) {
            console.log("Erro ao criar novo vendedor ", e)
            return false
        }
    }

    async removerVendedor(cpf) {
        try {
            await prisma.usuario.delete({ where: { cpf_cnpj: cpf } });
            return true;
        } catch(e) {
            console.log('Erro ao remover vendedor: ', e);
            return false
        }
    }

    async atualizarVendedor(cpf, novosDados) {
        return await prisma.usuario.update({
            where: { cpf_cnpj: cpf },
            data: novosDados
        });
    }

    // Acesso a todas as vendas
    async listarTodasVendas() {
        return await prisma.venda.findMany();
    }

    async obterVenda(numeroPedido) {
        return await prisma.venda.findUnique({ where: { numero_pedido: numeroPedido } });
    }

    // Relatórios e Análises
    async gerarRelatorio() {
        const vendas = await this.listarTodasVendas();

        const produtosVendidos = await prisma.venda_Produto.groupBy({
            by: ['produtoId'],
            _sum: {
                quantidade: true
            },
            orderBy: {
                _sum: {
                    quantidade: 'desc'
                }
            }
        });
        const totalVendas = vendas.reduce((acc, venda) => acc + venda.valor_final, 0);
        const totalLucro = vendas.reduce((acc, venda) => acc + (venda.valor_final - venda.valor_total), 0);
        
        const vendedorMaisVendas = await prisma.usuario.findMany({
            orderBy: {
                _count: {
                    vendas: 'desc'
                }
            },
            take: 1
        });

        const produtoMaisVendido = produtosVendidos[0] ? await Produto.obterProduto(produtosVendidos[0].produtoId) : null;

        return {
            totalVendas,
            totalLucro,
            vendedorMaisVendas: vendedorMaisVendas[0],
            produtoMaisVendido
        };
    }
}

module.exports = Gerente;

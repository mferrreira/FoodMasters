const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Venda = require('./Venda');
const prisma = require('../services/prismaClient');

class Vendedor extends Usuario {

    constructor(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor) {
        super(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor);
    }

    // Realizar venda
    async realizarVenda(dadosVenda) {
        const venda = new Venda(
            dadosVenda.numeroPedido,
            dadosVenda.dataVenda,
            dadosVenda.nomeCliente,
            dadosVenda.cpfCliente,
            dadosVenda.valorTotal,
            dadosVenda.desconto,
            dadosVenda.valorFinal,
            dadosVenda.formaPagamento,
            dadosVenda.statusVenda,
            dadosVenda.dataEntrega,
            dadosVenda.enderecoEntrega,
            this.cpf // ID do vendedor
        );

        return await venda.criarVenda();
    }

    // Visualizar venda
    async visualizarVenda(numeroPedido) {
        const venda = await prisma.venda.findUnique({
            where: { numero_pedido: numeroPedido },
            include: { Venda_Produto: true }
        });
        return venda;
    }

    // Consultar produtos
    async consultarProdutos() {
        const produtoInstance = new Produto();
        const produtos = await produtoInstance.listarTodosProdutos();
        return produtos;
    }

    // Gerar recibo
    async gerarRecibo(numeroPedido) {
        const venda = await this.visualizarVenda(numeroPedido);
        return venda.gerarRecibo();
    }

    async visualizarTodasVendas() {
        const vendas = await prisma.venda.findMany({
            where: { vendedorId: this.cpf },
            include: { Venda_Produto: true }
        });
        return vendas;
    }
}

module.exports = Vendedor;

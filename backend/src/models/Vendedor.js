const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Venda = require('./Venda');
const prisma = require('../services/prismaClient');

class Vendedor extends Usuario {


    constructor(cpf, nomeCompleto, email, senha,dataNascimento, 
        rg, endereco, telefone, dataAdmissao, salario, status, setor
    ) {
        super(cpf, nomeCompleto, email, senha,dataNascimento, rg, endereco, telefone, dataAdmissao, salario, status, setor);
    }

    // Realizar venda
    async iniciarVenda(dadosVenda) {
        const venda = new Venda(
            this.cpf,
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
        );

        // venda.save();
        return venda
    }

    async addProdutoVenda(Produto, Venda) {
        Venda.addProduto(Produto);
        Venda.updateValue
        return;
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

    async obterProduto(codigo_barras) {
        const produto = Produto.getProdutoPorCodigo(codigo_barras);
        return produto
    }

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

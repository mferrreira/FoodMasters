const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Vendedor = require('./Vendedor');
const Venda = require('./Venda');
const Categoria = require('./Categoria');
const prisma = require('../services/prismaClient');

class Gerente extends Usuario {

    constructor(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor) {
        super(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor);
    }

    // CRUD Produtos
    async listarTodosProdutos() {
        return await Produto.listarProdutos();
    }

    async obterProduto(codigoBarras) {
        return await Produto.obterProduto(codigoBarras);
    }

    async adicionarProduto(dadosProduto) {
        const produto = new Produto(
            dadosProduto.codigo_barras,
            dadosProduto.nome,
            dadosProduto.descricao,
            dadosProduto.categoriaId,
            dadosProduto.preco,
            dadosProduto.estoque,
            dadosProduto.marca,
            dadosProduto.data_fabricacao,
            dadosProduto.data_validade,
            dadosProduto.imagem_url,
            dadosProduto.status,
            dadosProduto.fornecedor
        );
        return await produto.adicionarProduto();
    }

    async atualizarProduto(codigoBarras, novosDados) {
        const produto = new Produto(codigoBarras, ...Object.values(novosDados));
        return await produto.atualizarProduto(codigoBarras, novosDados);
    }

    async removerProduto(codigoBarras) {
        const produto = new Produto(codigoBarras);
        return await produto.removerProduto(codigoBarras);
    }

    // CRUD Vendedores
    async listarTodosVendedores() {
        return await prisma.vendedor.findMany();
    }

    async obterVendedor(cpf) {
        return await prisma.vendedor.findUnique({ where: { cpf_cnpj: cpf } });
    }

    async adicionarVendedor(dadosVendedor) {
        const vendedor = await prisma.vendedor.create({
            data: {
                cpf_cnpj: dadosVendedor.cpf_cnpj,
                rg: dadosVendedor.rg,
                nome_completo: dadosVendedor.nome_completo,
                data_nascimento: dadosVendedor.data_nascimento,
                email: dadosVendedor.email,
                senha: dadosVendedor.senha,
                endereco: dadosVendedor.endereco,
                telefone: dadosVendedor.telefone,
                data_admissao: dadosVendedor.data_admissao,
                salario: dadosVendedor.salario,
                status: dadosVendedor.status,
                setor: dadosVendedor.setor,
            }
        });
        return vendedor;
    }

    async removerVendedor(cpf) {
        return await prisma.vendedor.delete({ where: { cpf_cnpj: cpf } });
    }

    async atualizarVendedor(cpf, novosDados) {
        return await prisma.vendedor.update({
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
        
        const vendedorMaisVendas = await prisma.vendedor.findMany({
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

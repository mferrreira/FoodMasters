const prisma = require("../services/prismaClient");

class Venda {

    constructor(vendedorId, numeroPedido, nomeCliente, cpfCliente, valorTotal,
         desconto, valorFinal, formaPagamento, statusVenda, dataEntrega, enderecoEntrega) {
        this.vendedorId = vendedorId;
        this.numeroPedido = numeroPedido
        
        this.dataVenda = new Date().toISOString();
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.valorTotal = valorTotal;
        this.desconto = desconto;
        this.valorFinal = valorFinal;
        this.formaPagamento = formaPagamento;
        this.statusVenda = statusVenda;
        this.dataEntrega = new Date(dataEntrega).toISOString();
        this.enderecoEntrega = enderecoEntrega;

        this.produtos = []; 
    }

    // CRUD Registro de Venda
    async save() {
        this.numeroPedido = this.numeroPedido || this.generateUniqueId();
    
        return await prisma.venda.create({
            data: {
                numero_pedido: this.numeroPedido,
                data_venda: this.dataVenda,
                nome_cliente: this.nomeCliente,
                cpf_cnpj_cliente: this.cpfCliente,
                valor_total: this.valorTotal,
                desconto: this.desconto,
                valor_final: this.valorFinal,
                forma_pagamento: this.formaPagamento,
                status_venda: this.statusVenda,
                data_entrega: this.dataEntrega,
                endereco_entrega: this.enderecoEntrega,
                vendedorId: this.vendedorId,
                Venda_Produto: {
                    create: this.produtos.map(produto => ({
                        produtoId: produto.codigo_barras,
                        quantidade: produto.quantidade,
                        preco_unitario: produto.preco_unitario,
                    })),
                },
            },
        });
    }

    generateUniqueId() {
        return 'Venda-' + Math.random().toString(36).substr(2, 9);
    }
    

    async update(numeroPedido, ...novosDados) {
        const existingVenda = await Venda.findByNumeroPedido(numeroPedido);
        
        if (existingVenda) {

            return await prisma.venda.update({
                where: { numero_pedido: novosDados.numeroPedido },
                data: {
                    data_venda: novosDados.dataVenda,
                    nome_cliente: novosDados.nomeCliente,
                    cpf_cnpj_cliente: novosDados.cpfCliente,
                    valor_total: novosDados.valorTotal,
                    desconto: novosDados.desconto,
                    valor_final: novosDados.valorFinal,
                    forma_pagamento: novosDados.formaPagamento,
                    status_venda: novosDados.statusVenda,
                    data_entrega: novosDados.dataEntrega,
                    endereco_entrega: novosDados.enderecoEntrega,
                    vendedorId: novosDados.vendedorId,
                    Venda_Produto: {

                        upsert: novosDados.produtos.map(produto => ({
                            where: { produtoId: produto.codigo_barras },
                            update: {
                                quantidade: produto.quantidade,
                                preco_unitario: produto.preco_unitario,
                            },
                            create: {
                                produtoId: produto.codigo_barras,
                                quantidade: produto.quantidade,
                                preco_unitario: produto.preco_unitario,
                            },
                        })),
                    },
                },
            });
        }
    }

    async delete() {
        return await prisma.venda.delete({
            where: { numero_pedido: this.numeroPedido },
        });
    }

    async addProduto(produto) {
        this.produtos.push(produto);
        await prisma.venda_Produto.create({
            data: {
                vendaId: this.numeroPedido,
                produtoId: produto.codigo_barras,
                quantidade: produto.quantidade,
                preco_unitario: produto.preco_unitario,
            },
        });
    }

    async removeProduto(produto) {
        this.produtos = this.produtos.filter(p => p.codigo_barras !== produto.codigo_barras);
        await prisma.venda_Produto.deleteMany({
            where: {
                vendaId: this.numeroPedido,
                produtoId: produto.codigo_barras,
            },
        });
    }


    // TALVEZ não seja responsabilidade do server... excluir dps
    async calcularValorFinal() {
        this.valorFinal = this.valorTotal - (this.desconto || 0);
        await this.save();
    }

    async gerarRecibo() {
        // Gera um recibo para a venda

        return {
            numero_pedido: this.numeroPedido,
            data_venda: this.dataVenda,
            nome_cliente: this.nomeCliente,
            cpf_cnpj_cliente: this.cpfCliente,
            valor_total: this.valorTotal,
            desconto: this.desconto,
            valor_final: this.valorFinal,
            forma_pagamento: this.formaPagamento,
            status_venda: this.statusVenda,
            data_entrega: this.dataEntrega,
            endereco_entrega: this.enderecoEntrega,
            produtos: this.produtos,
        };
    }

    static async findByNumeroPedido(numeroPedido) {
        return await prisma.venda.findUnique({
            where: { numero_pedido: numeroPedido },
            include: { Venda_Produto: true },
        });
    }

    async getProdutosMaisVendidos(limit = 5) {
        return await prisma.venda_Produto.groupBy({
            by: ['produtoId'],
            _sum: {
                quantidade: true,
            },
            orderBy: {
                _sum: {
                    quantidade: 'desc',
                },
            },
            take: limit,
        });
    }

    async getVendedoresMaisAtivos(limit = 5) {
        return await prisma.venda.groupBy({
            by: ['vendedorId'],
            _count: {
                numero_pedido: true,
            },
            orderBy: {
                _count: {
                    numero_pedido: 'desc',
                },
            },
            take: limit,
        });
    }
}

module.exports = Venda;

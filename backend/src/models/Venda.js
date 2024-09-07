class Venda {

    constructor(numeroPedido, dataVenda, nomeCliente, cpfCliente, valorTotal, desconto, valorFinal, formaPagamento, statusVenda, dataEntrega, enderecoEntrega, vendedorId) {
        this.numeroPedido = numeroPedido;
        this.dataVenda = dataVenda;
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.valorTotal = valorTotal;
        this.desconto = desconto;
        this.valorFinal = valorFinal;
        this.formaPagamento = formaPagamento;
        this.statusVenda = statusVenda;
        this.dataEntrega = dataEntrega;
        this.enderecoEntrega = enderecoEntrega;
        this.vendedorId = vendedorId;

        this.produtos = []; // Inicializa o array de produtos
    }

    // CRUD Registro de Venda
    async save() {
        // Verifica se a venda já existe
        const existingVenda = await Venda.findByNumeroPedido(this.numeroPedido);
        if (existingVenda) {
            // Atualiza a venda existente
            return await prisma.venda.update({
                where: { numero_pedido: this.numeroPedido },
                data: {
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
                        // Atualiza produtos associados
                        upsert: this.produtos.map(produto => ({
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
        } else {
            // Cria uma nova venda
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
    }

    async delete() {
        return await prisma.venda.delete({
            where: { numero_pedido: this.numeroPedido },
        });
    }

    async addProduto(produto) {
        // Adiciona um produto à venda e atualiza o banco de dados
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
        // Remove um produto da venda e atualiza o banco de dados
        this.produtos = this.produtos.filter(p => p.codigo_barras !== produto.codigo_barras);
        await prisma.venda_Produto.deleteMany({
            where: {
                vendaId: this.numeroPedido,
                produtoId: produto.codigo_barras,
            },
        });
    }

    async calcularValorFinal() {
        // Calcula o valor final da venda
        this.valorFinal = this.valorTotal - (this.desconto || 0);
        await this.save(); // Atualiza a venda com o valor final calculado
    }

    async gerarRecibo() {
        // Gera um recibo para a venda
        // Aqui você pode formatar a informação da venda para gerar um recibo
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
}

module.exports = Venda;

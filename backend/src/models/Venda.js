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

            this.produtos = [];
    }

    // CRUD Registro de Venda

    // Atualizar status venda (entrega, cancelado)

    // Adicionar Produto
    // Remover produto
    
    // calcular valor final
    
    // gerar recibo

}

module.exports = Venda;
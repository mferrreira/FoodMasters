class Produto{

    constructor(codigo_barras, nome, descricao, categoriaId, preco, estoque, marca, data_fabricacao, data_validade, imagem_url, status, fornecedor, categoria, venda_produto, gerente) {
        this.codigo_barras = codigo_barras;
        this.nome = nome;
        this.descricao = descricao, 
        this.categoriaId = categoriaId;
        this.preco = preco;
        this.estoque = estoque;
        this.marca = marca;
        this.data_fabricacao = data_fabricacao;
        this.data_validade = data_validade;
        this.imagem_url = imagem_url;
        this.status = status;
        this.fornecedor = fornecedor;
        this.categoria = categoria;
        this.venda_produto = venda_produto;
        this.gerente = gerente;
    }

    // CRUD Produto

    // Verificar disponibilidade

    // Remover Produto do estoque

    // Associar Categoria

    // Alterar status
}

module.exports = Produto;
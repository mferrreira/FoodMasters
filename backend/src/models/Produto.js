const PrismaClient = require('../services/prismaClient');

class Produto {
    constructor(
        codigo_barras, nome, descricao, categoriaId, preco, estoque, marca, 
        data_fabricacao, data_validade, imagem_url, status, fornecedor
    ) {
        this.codigo_barras = codigo_barras;
        this.nome = nome;
        this.descricao = descricao;
        this.categoriaId = categoriaId;
        this.preco = preco;
        this.estoque = estoque;
        this.marca = marca;
        this.data_fabricacao = data_fabricacao;
        this.data_validade = data_validade;
        this.imagem_url = imagem_url;
        this.status = status;
        this.fornecedor = fornecedor;
    }

    async save() {
        return await PrismaClient.produto.create({
                data: {
                    codigo_barras: this.codigo_barras,
                    nome: this.nome,
                    descricao: this.descricao,
                    categoriaId: this.categoriaId,
                    preco: this.preco,
                    estoque: this.estoque,
                    marca: this.marca,
                    data_fabricacao: this.data_fabricacao,
                    data_validade: this.data_validade,
                    imagem_url: this.imagem_url,
                    status: this.status,
                    fornecedor: this.fornecedor,
                },
            });
    }

    // Atualizar Produto no banco de dados
    async update(codigo_barras, updateData) {
        try {
            const produtoAtualizado = await PrismaClient.produto.update({
                where: { codigo_barras: codigo_barras },
                data: updateData
            });
            return produtoAtualizado;
        } catch (error) {
            throw new Error(`Erro ao atualizar o produto: ${error.message}`);
        }
    }

    // Remover Produto do banco de dados
    async delete(codigo_barras) {
        try {
            await PrismaClient.produto.delete({
                where: { codigo_barras: codigo_barras }
            });
            return `Produto com código de barras ${codigo_barras} removido com sucesso.`;
        } catch (error) {
            throw new Error(`Erro ao remover o produto: ${error.message}`);
        }
    }

    // Verificar Disponibilidade do Produto (estoque > 0)
    static async verificarDisponibilidade(codigo_barras) {
        try {
            const produto = await PrismaClient.produto.findUnique({
                where: { codigo_barras: codigo_barras }
            });
            if (!produto) {
                throw new Error('Produto não encontrado.');
            }
            return produto.estoque > 0;
        } catch (error) {
            throw new Error(`Erro ao verificar a disponibilidade do produto: ${error.message}`);
        }
    }

    // Associar Categoria ao Produto
    async associarCategoria(categoriaId) {
        try {
            const produtoAtualizado = await PrismaClient.produto.update({
                where: { codigo_barras: this.codigo_barras },
                data: { categoriaId: categoriaId }
            });
            return produtoAtualizado;
        } catch (error) {
            throw new Error(`Erro ao associar categoria ao produto: ${error.message}`);
        }
    }

    // Alterar Status do Produto
    async alterarStatus(novoStatus) {
        try {
            const produtoAtualizado = await PrismaClient.produto.update({
                where: { codigo_barras: this.codigo_barras },
                data: { status: novoStatus }
            });
            return produtoAtualizado;
        } catch (error) {
            throw new Error(`Erro ao alterar o status do produto: ${error.message}`);
        }
    }

    // Obter Produto pelo código de barras
    static async getProdutoPorCodigo(codigo_barras) {
        try {
            const produto = await PrismaClient.produto.findUnique({
                where: { codigo_barras: codigo_barras }
            });
            return produto;
        } catch (error) {
            throw new Error(`Erro ao obter o produto: ${error.message}`);
        }
    }

    // Listar todos os produtos
    static async listarTodosProdutos() {
        try {
            const produtos = await PrismaClient.produto.findMany();
            return produtos;
        } catch (error) {
            throw new Error(`Erro ao listar os produtos: ${error.message}`);
        }
    }
}

module.exports = Produto;

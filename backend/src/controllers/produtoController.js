const Produto = require('../models/Produto');
const Gerente = require('../models/Gerente');
const Categoria = require('../models/Categoria');

class ProdutoController {

    static async create(req, res) {
        try {
            const { codigo_barras, nome, descricao, categoriaId, preco, estoque, marca, data_fabricacao, data_validade, imagem_url, status, fornecedor } = req.body;
            
            if (!codigo_barras || !nome || !preco || estoque === undefined) 
                return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });

            // Verificar se o produto já existe
            const produtoExiste = await Produto.getProdutoPorCodigo(codigo_barras);
            if (produtoExiste) 
                return res.status(400).json({ error: "Produto já existe" });

            const produto = new Produto(codigo_barras, nome, descricao, categoriaId, preco, estoque, marca, data_fabricacao, data_validade, imagem_url, status, fornecedor);

            await produto.save(); // Salvar produto no banco de dados

            return res.status(201).json(produto);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async listarTodosProdutos(req, res) {
        try {
            const produtos = await Produto.listarTodosProdutos();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async getProduto(req, res) {
        try {
            const { codigo_barras } = req.params;
            const produto = await Produto.getProdutoPorCodigo(codigo_barras);

            if (!produto) 
                return res.status(404).json({ error: "Produto não encontrado" });

            return res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async update(req, res) {
        try {
            const { codigo_barras } = req.params;
            const { nome, descricao, categoriaId, preco, estoque, marca, data_fabricacao, data_validade, imagem_url, status, fornecedor } = req.body;

            const p = await Produto.getProdutoPorCodigo(codigo_barras);
            const produto = new Produto(p.codigo_barras, p.nome, p.descricao, p.categoriaId, p.preco, p.estoque, p.marca, p.data_fabricacao, p.data_validade, p.imagem_url, p.status, p.fornecedor);
            if (!produto) 
                return res.status(404).json({ error: "Produto não encontrado" });

            console.log(nome, descricao, categoriaId, preco, estoque)

            const a = await produto.update(produto.codigo_barras, produto); // Atualizar produto no banco de dados
            console.log(a)
            //produto.update(codigo_barras)
            return res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async delete(req, res) {
        try {
            const { codigo_barras } = req.params;
            const p = await Produto.getProdutoPorCodigo(codigo_barras);
            const produto = new Produto(p.codigo_barras, p.nome, p.descricao, p.categoriaId, p.preco, p.estoque, p.marca, p.data_fabricacao, p.data_validade, p.imagem_url, p.status, p.fornecedor);

            if (!produto) 
                return res.status(404).json({ error: "Produto não encontrado" });

            await Produto.delete(codigo_barras); // Excluir produto do banco de dados

            return res.status(200).json({ message: "Produto excluído com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async associarCategoria(req, res) {
        try {
            const { codigo_barras } = req.params;
            const { categoriaId } = req.body;

            if (!categoriaId) 
                return res.status(400).json({ error: "Categoria ID é obrigatório" });

            // Encontrar o produto
            const produto = await Produto.getProdutoPorCodigo(codigo_barras);
            if (!produto) 
                return res.status(404).json({ error: "Produto não encontrado" });

            // Encontrar a categoria
            const categoria = await Categoria.obterCategoria(categoriaId);
            if (!categoria) 
                return res.status(404).json({ error: "Categoria não encontrada" });

            // Associar a categoria ao produto
            produto.categoriaId = categoriaId;
            await produto.save(); // Atualizar produto no banco de dados

            return res.status(200).json({ message: "Categoria associada com sucesso", produto });
        } catch (error) {
            console.error("Erro ao associar categoria ao produto:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

module.exports = ProdutoController;

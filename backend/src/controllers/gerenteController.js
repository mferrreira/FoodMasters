const Gerente = require("../models/Gerente");
const Produto = require("../models/Produto");
const Vendedor = require("../models/Vendedor");
const encontrarGerenteOuVendedor = require("../utils/encontrarGerenteOuVendedor");

class GerenteController {
  // Adiciona um novo produto
  static async addProduto(req, res) {
    try {
      const {
        cpf_cnpj,
        nome,
        descricao,
        categoriaId,
        preco,
        estoque,
        marca,
        data_fabricacao,
        data_validade,
        imagem_url,
        status,
        fornecedor,
      } = req.body;
      const gerente = await encontrarGerenteOuVendedor(cpf_cnpj);
      if (!gerente)
        return res.status(404).json({ error: "Gerente não encontrado" });

      const produto = new Produto(
        cpf_cnpj,
        nome,
        descricao,
        categoriaId,
        preco,
        estoque,
        marca,
        data_fabricacao,
        data_validade,
        imagem_url,
        status,
        fornecedor,
        gerente
      );
      await produto.save(); // Cria o produto
      res.status(201).json({ message: "Produto adicionado com sucesso" });
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Remove um produto
  static async removeProduto(req, res) {
    try {
      const { cpf_cnpj, codigo_barras } = req.body;
      const gerente = await encontrarGerenteOuVendedor(cpf_cnpj);

      if (!gerente)
        return res.status(404).json({ error: "Gerente não encontrado" });

      const produto = await Produto.getProdutoPorCodigo(codigo_barras);
      await produto.delete(codigo_barras);
      res.status(200).json({ message: "Produto removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Atualiza um produto
  static async editProduto(req, res) {
    try {
      const { cpf_cnpj, codigo_barras, updateData } = req.body;
      const gerente = await encontrarGerenteOuVendedor(cpf_cnpj);

      if (!gerente)
        return res.status(404).json({ error: "Gerente não encontrado" });

      const produto = new Produto(codigo_barras);
      await produto.update(codigo_barras, updateData); // Atualiza o produto
      res.status(200).json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Lista todos os produtos
  static async listProdutos(req, res) {
    try {
      const produtos = await Produto.listarTodosProdutos(); // Listar todos os produtos
      res.status(200).json(produtos);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async getProdutoPorCodigo(req, res) {
    try{
      const {id} = req.params;
      let p = await Produto.getProdutoPorCodigo(id);

      if (!p) return res.status(404).json({error: "Produto não encontrado"})

      res.status(200).json(p);

    } catch(e) {
      console.error("Erro ao retornar produto: ", e);
      res.status(500).json({error: "Erro interno do servidor."});
    }
  }

  static async getVendedor(req, res) {
    const { id } = req.params;

    try {

      const vendedor = await encontrarGerenteOuVendedor(id);
      console.log(vendedor)
      if (!vendedor)
        return res.status(404).json({ message: "Vendedor não encontrado" });

      res.json( vendedor);

    } catch (error) {

      console.error("Erro ao buscar vendedor:", error);
      res.status(500).json({ message: "Erro ao buscar vendedor" });

    }
  }

  // Adiciona um novo vendedor
  static async addVendedor(req, res) {
    try {
      const {
        cpf_cnpj,
        rg,
        nome_completo,
        data_nascimento,
        email,
        senha,
        endereco,
        telefone,
        data_admissao,
        salario,
        status,
        setor,
      } = req.body;

      const vendedor = new Vendedor(
        cpf_cnpj,
        nome_completo,
        email,
        senha,
        data_nascimento,
        rg,
        endereco,
        telefone,
        data_admissao,
        salario,
        status,
        setor
      );

      console.log(vendedor)
      await vendedor.save(true); // Cria o vendedor
      res.status(201).json({ message: "Vendedor adicionado com sucesso" });
    } catch (error) {
      console.error("Erro ao adicionar vendedor:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Remove um vendedor
  static async removeVendedor(req, res) {
    try {
      const { cpf_cnpj } = req.params;

      await Gerente.removerVendedor(cpf_cnpj);

      res.status(200).json({ message: "Vendedor removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover vendedor:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Atualiza um vendedor
  static async editVendedor(req, res) {
    try {
      const { cpf_cnpj, vendedorCpf_cnpj, updateData } = req.body;
      const gerente = await encontrarGerenteOuVendedor(cpf_cnpj);
      if (!gerente)
        return res.status(404).json({ error: "Gerente não encontrado" });

      const vendedor = new encontrarGerenteOuVendedor(vendedorCpf_cnpj);
      await vendedor.update(updateData); // Atualiza o vendedor
      res.status(200).json({ message: "Vendedor atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar vendedor:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Lista todos os vendedores
  static async listVendedores(req, res) {
    try {
      const vendedores = await Gerente.listarTodosVendedores(); // Listar todos os vendedores
      res.status(200).json(vendedores);
    } catch (error) {
      console.error("Erro ao listar vendedores:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Acessa todas as vendas
  static async listVendas(req, res) {
    try {
      const { cpf_cnpj } = req.body;
      const gerente = await encontrarGerenteOuVendedor(cpf_cnpj);
      if (!gerente)
        return res.status(404).json({ error: "Gerente não encontrado" });

      const vendas = await gerente.listarTodasVendas(); // Acessa todas as vendas
      res.status(200).json(vendas);
    } catch (error) {
      console.error("Erro ao listar vendas:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Gera relatório
  static async gerarRelatorio(req, res) {
    try {
      const { cpf_cnpj } = req.body;
      const gerente = await encontrarGerenteOuVendedor(cpf_cnpj);
      if (!gerente)
        return res.status(404).json({ error: "Gerente não encontrado" });

      const relatorio = await gerente.gerarRelatorio(); // Gera relatório
      res.status(200).json(relatorio);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

module.exports = GerenteController;

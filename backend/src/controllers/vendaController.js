const Venda = require('../models/Venda');
const Produto = require('../models/Produto');
const prisma = require("../services/prismaClient");


class VendaController {
  
  static async createVenda(req, res) {
    try {
        const {
            nomeCliente,
            cpfCliente,
            valorTotal,
            desconto,
            formaPagamento,
            statusVenda,
            dataEntrega,
            enderecoEntrega,
            vendedorId,
            produtos,
        } = req.body;

        // Cria uma nova instância da venda sem o numeroPedido
        const venda = new Venda(
            vendedorId,
            null,
            nomeCliente,
            cpfCliente,
            valorTotal,
            desconto,
            null,
            formaPagamento,
            statusVenda,
            dataEntrega,
            enderecoEntrega,
        );

        // Salva a venda no banco de dados
        const vendaSalva = await venda.save();

        // Adiciona produtos à venda usando o numeroPedido gerado
        for (const produtoData of produtos) {
            const produto = await Produto.getProdutoPorCodigo(produtoData.codigo_barras);
            if (produto) {
                await venda.addProduto({
                    codigo_barras: produto.codigo_barras,
                    quantidade: produtoData.quantidade,
                    preco_unitario: produto.preco,
                });
            }
        }

        // Calcula o valor final da venda
        await venda.calcularValorFinal();

        return res.status(201).json({ message: 'Venda criada com sucesso!', venda: vendaSalva });
    } catch (error) {
        console.error("Erro ao criar venda:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}


  static async updateVenda(req, res) {
    try {
      const { numeroPedido } = req.params;
      const {
        dataVenda,
        nomeCliente,
        cpfCliente,
        valorTotal,
        desconto,
        valorFinal,
        formaPagamento,
        statusVenda,
        dataEntrega,
        enderecoEntrega,
        vendedorId,
        produtos
      } = req.body;

      // Encontra a venda existente
      const venda = await Venda.findByNumeroPedido(numeroPedido);
      if (!venda) {
        return res.status(404).json({ error: "Venda não encontrada" });
      }

      // Atualiza a venda com as novas informações
      venda.dataVenda = dataVenda || venda.dataVenda;
      venda.nomeCliente = nomeCliente || venda.nomeCliente;
      venda.cpfCliente = cpfCliente || venda.cpfCliente;
      venda.valorTotal = valorTotal || venda.valorTotal;
      venda.desconto = desconto || venda.desconto;
      venda.valorFinal = valorFinal || venda.valorFinal;
      venda.formaPagamento = formaPagamento || venda.formaPagamento;
      venda.statusVenda = statusVenda || venda.statusVenda;
      venda.dataEntrega = dataEntrega || venda.dataEntrega;
      venda.enderecoEntrega = enderecoEntrega || venda.enderecoEntrega;
      venda.vendedorId = vendedorId || venda.vendedorId;

      // Atualiza produtos
      if (produtos) {
        for (const produtoData of produtos) {
          const produto = await Produto.getProdutoPorCodigo(produtoData.codigo_barras);
          if (produto) {
            if (produtoData.remove) {
              await venda.removeProduto({
                codigo_barras: produto.codigo_barras,
                quantidade: produtoData.quantidade,
                preco_unitario: produto.preco
              });
            } else {
              venda.addProduto({
                codigo_barras: produto.codigo_barras,
                quantidade: produtoData.quantidade,
                preco_unitario: produto.preco
              });
            }
          }
        }
      }

      // Salva as alterações da venda
      await venda.save();

      return res.status(200).json({ message: 'Venda atualizada com sucesso!', venda });
    } catch (error) {
      console.error("Erro ao atualizar venda:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async deleteVenda(req, res) {
    try {
      const { numeroPedido } = req.params;

      // Encontra e deleta a venda
      const venda = await Venda.findByNumeroPedido(numeroPedido);
      if (!venda) {
        return res.status(404).json({ error: "Venda não encontrada" });
      }

      await venda.delete();

      return res.status(200).json({ message: 'Venda deletada com sucesso!' });
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async getVenda(req, res) {
    try {
      const { numeroPedido } = req.params;
      console.log(numeroPedido)
      // Encontra a venda pelo número do pedido
      const venda = await Venda.findByNumeroPedido(numeroPedido);
      if (!venda) {
        return res.status(404).json({ error: "Venda não encontrada" });
      }

      return res.status(200).json({ venda });
    } catch (error) {
      console.error("Erro ao obter venda:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async getTodasVendas(req, res) {
    try {
      // Recupera todas as vendas
      const vendas = await prisma.venda.findMany({
        include: {
          Venda_Produto: true
        }
      });

      return res.status(200).json({ vendas });
    } catch (error) {
      console.error("Erro ao obter todas as vendas:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async gerarRecibo(req, res) {
    try {
      const { numeroPedido } = req.params;

      // Encontra a venda pelo número do pedido
      const venda = await Venda.findByNumeroPedido(numeroPedido);
      if (!venda) {
        return res.status(404).json({ error: "Venda não encontrada" });
      }

      // Gera o recibo
      const recibo = await venda.gerarRecibo();

      return res.status(200).json({ recibo });
    } catch (error) {
      console.error("Erro ao gerar recibo:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static async getProdutosMaisVendidos(req, res) {
    try {
        const produtosMaisVendidos = await Venda.getProdutosMaisVendidos();
        console.log(produtosMaisVendidos)
        res.status(200).json(produtosMaisVendidos);
    } catch (error) {
        console.error("Erro ao buscar produtos mais vendidos:", error);
        res.status(500).json({ message: "Erro ao buscar produtos mais vendidos." });
    }
}

static async getVendedoresMaisAtivos(req, res) {
    try {
        const vendedoresMaisAtivos = await Venda.getVendedoresMaisAtivos();
        res.json(vendedoresMaisAtivos);
    } catch (error) {
        console.error("Erro ao buscar vendedores mais ativos:", error);
        res.status(500).json({ message: "Erro ao buscar vendedores mais ativos." });
    }
}
}

module.exports = VendaController;

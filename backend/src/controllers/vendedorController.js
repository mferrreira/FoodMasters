const Vendedor = require('../models/Vendedor');
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');

class VendedorController {

    // Realiza uma nova venda
    static async realizarVenda(req, res) {
        try {
            const { numeroPedido, dataVenda, nomeCliente, cpfCliente, valorTotal, desconto, valorFinal, formaPagamento, statusVenda, dataEntrega, enderecoEntrega, produtos } = req.body;
            const vendedorId = req.user.id;

            // Cria uma nova instância de Venda
            const venda = new Venda(numeroPedido, dataVenda, nomeCliente, cpfCliente, valorTotal, desconto, valorFinal, formaPagamento, statusVenda, dataEntrega, enderecoEntrega, vendedorId);
            
            // Adiciona produtos à venda
            for (const produto of produtos) {
                const produtoExistente = await Produto.getProduto(produto.codigo_barras);
                if (!produtoExistente) {
                    return res.status(404).json({ error: `Produto com código de barras ${produto.codigo_barras} não encontrado` });
                }
                venda.addProduto(produto.codigo_barras, produto.quantidade, produto.preco_unitario);
            }

            // Salva a venda no banco de dados
            await venda.save();

            return res.status(201).json({ message: 'Venda realizada com sucesso!', venda });
        } catch (error) {
            console.error("Erro ao realizar venda:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    // Visualiza uma venda específica
    static async visualizarVenda(req, res) {
        try {
            const { numeroPedido } = req.params;
            const venda = await Venda.getVenda(numeroPedido);
            
            if (!venda) {
                return res.status(404).json({ error: "Venda não encontrada" });
            }

            return res.status(200).json(venda);
        } catch (error) {
            console.error("Erro ao visualizar venda:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    // Consulta todos os produtos disponíveis
    static async consultarProdutos(req, res) {
        try {
            const produtos = await Produto.getTodosProdutos();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao consultar produtos:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    // Gera um recibo para uma venda específica
    static async gerarRecibo(req, res) {
        try {
            const { numeroPedido } = req.params;
            const venda = await Venda.getVenda(numeroPedido);

            if (!venda) {
                return res.status(404).json({ error: "Venda não encontrada" });
            }

            // Gera o recibo como uma string ou formato desejado
            const recibo = `Recibo da Venda: ${numeroPedido}\nCliente: ${venda.nomeCliente}\nValor Final: ${venda.valorFinal}\nData: ${venda.dataVenda}`;
            
            return res.status(200).send(recibo);
        } catch (error) {
            console.error("Erro ao gerar recibo:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

module.exports = VendedorController;

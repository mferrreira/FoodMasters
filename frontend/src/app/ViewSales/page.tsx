'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api';  // Importando a instância do Axios

interface ProdutoVendido {
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

interface Venda {
  dataVenda: string;
  numeroPedido: string;
  nomeCliente: string;
  cpfCnpjCliente: string;
  produtosVendidos: ProdutoVendido[];
  valorTotal: number;
  desconto: number;
  valorFinal: number;
  formaPagamento: string;
  vendedorResponsavel: string;
  statusVenda: string;
  dataEntrega: string;
  enderecoEntrega: string;
}

export default function ViewSales() {
  const [venda, setVenda] = useState<Venda | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar a venda do backend
    const fetchVenda = async () => {
      try {
        setLoading(true);
        setError(null);

        // Faz a requisição para a rota do backend responsável pelas vendas
        const response = await api.get('/api/vendas/0');  // Passa o número do pedido, por exemplo

        // Verifica se os dados existem e atualiza o estado
        if (response.data) {
          setVenda(response.data);
        } else {
          setError('Venda não encontrada');
        }

      } catch (err) {
        setError('Erro ao buscar as informações da venda');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenda();
  }, []);

  if (loading) {
    return <p className="flex justify-center">Carregando informações da venda...</p>;
  }

  if (error) {
    return <p className="flex justify-center text-red-500">{error}</p>;
  }

  if (!venda) {
    return <p className="flex justify-center">Nenhuma venda encontrada.</p>;
  }

  return (
    <div className="mx-24">
      <h1 className="text-2xl font-bold mb-6">Detalhes da Venda</h1>
      <div className="grid gap-4">
        <div><strong>Data da Venda:</strong> {venda.dataVenda}</div>
        <div><strong>Número do Pedido:</strong> {venda.numeroPedido}</div>
        <div><strong>Nome do Cliente:</strong> {venda.nomeCliente}</div>
        <div><strong>CNPJ/CPF do Cliente:</strong> {venda.cpfCnpjCliente}</div>
        <div><strong>Vendedor Responsável:</strong> {venda.vendedorResponsavel}</div>
        <div><strong>Status da Venda:</strong> {venda.statusVenda}</div>
        <div><strong>Data de Entrega:</strong> {venda.dataEntrega}</div>
        <div><strong>Endereço de Entrega:</strong> {venda.enderecoEntrega}</div>
        <div><strong>Forma de Pagamento:</strong> {venda.formaPagamento}</div>
      </div>

      <h2 className="text-xl font-bold mt-6">Produtos Vendidos</h2>
      <table className="w-full bg-white border border-gray-200 mt-4 ">
        <thead>
          <tr>
            <th className="border px-4 py-2">Produto</th>
            <th className="border px-4 py-2">Quantidade</th>
            <th className="border px-4 py-2">Preço Unitário</th>
          </tr>
        </thead>
        <tbody>
          {venda.produtosVendidos.map((produto, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{produto.nome}</td>
              <td className="border px-4 py-2">{produto.quantidade}</td>
              <td className="border px-4 py-2">R$ {produto.precoUnitario.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-4 mt-6">
        <div><strong>Valor Total da Venda:</strong> R$ {venda.valorTotal.toFixed(2)}</div>
        <div><strong>Desconto:</strong> R$ {venda.desconto.toFixed(2)}</div>
        <div><strong>Valor Final:</strong> R$ {venda.valorFinal.toFixed(2)}</div>
      </div>
    </div>
  );
}

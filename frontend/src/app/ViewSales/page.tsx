'use client';

import React, { useState, useEffect } from 'react';

interface Venda {
  dataVenda: string;
  numeroPedido: string;
  nomeCliente: string;
  cpfCnpjCliente: string;
  produtosVendidos: { nome: string; quantidade: number; precoUnitario: number }[];
  valorTotal: number;
  desconto: number;
  valorFinal: number;
  formaPagamento: string;
  vendedorResponsavel: string;
  statusVenda: string;
  dataEntrega: string;
  enderecoEntrega: string;
}

const vendaExemplo: Venda = {
  dataVenda: '2024-09-30',
  numeroPedido: '123456',
  nomeCliente: 'João da Silva',
  cpfCnpjCliente: '123.456.789-00',
  produtosVendidos: [
    { nome: 'Produto A', quantidade: 2, precoUnitario: 50 },
    { nome: 'Produto B', quantidade: 1, precoUnitario: 150 },
  ],
  valorTotal: 250,
  desconto: 25,
  valorFinal: 225,
  formaPagamento: 'Cartão de Crédito',
  vendedorResponsavel: 'Maria dos Santos',
  statusVenda: 'Em Processamento',
  dataEntrega: '2024-10-05',
  enderecoEntrega: 'Rua Exemplo, 123, Cidade Exemplo',
};

export default function ViewSales () {
  const [venda, setVenda] = useState<Venda | null>(null);

  useEffect(() => {
    // Aqui você faria uma requisição para buscar as informações da venda
    // Por exemplo, utilizando fetch ou axios. Estamos utilizando um exemplo fixo.
    setVenda(vendaExemplo);
  }, []);

  if (!venda) {
    return <p className="flex justify-center">Carregando informações da venda...</p>;
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
};



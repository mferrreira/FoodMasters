'use client';
import React, { useState, useEffect } from 'react';

// Definindo a interface para os dados do produto
interface ProductDetails {
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  estoque: number;
  codigo_barras: string;
  marca: string;
  data_fabricacao: string;
  data_validade: string;
  imagem_url: string;
  status: string;
  fornecedor: string;
}

// Dados fictícios do produto
const produtoExemplo: ProductDetails = {
  nome: 'Produto Exemplo',
  descricao: 'Este é um exemplo de descrição para o Produto Exemplo.',
  categoria: 'Tecnologia',
  preco: 299.99,
  estoque: 20,
  codigo_barras: '123456789012',
  marca: 'Marca Exemplo',
  data_fabricacao: '2023-01-01',
  data_validade: '2025-01-01',
  imagem_url: 'https://via.placeholder.com/150', // URL da imagem do produto
  status: 'Ativo',
  fornecedor: 'Fornecedor Exemplo',
};

export default function ProductInformation() {
  const [product, setProduct] = useState<ProductDetails | null>(null);

  useEffect(() => {
    // Simulação de uma requisição para buscar os detalhes do produto
    setProduct(produtoExemplo);
  }, []);

  if (!product) {
    return <p>Carregando detalhes do produto...</p>;
  }

  return (
    <div className="bg-white mx-24 mt-6">
      <h1 className="text-3xl font-bold mb-4">Detalhes do Produto</h1>
      
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {/* Exibição da imagem do produto */}
        
        {/* Informações detalhadas do produto */}
        <div className="grid grid-cols-1 gap-4">
          <div><strong>Nome do Produto:</strong> {product.nome}</div>
          <div><strong>Descrição:</strong> {product.descricao}</div>
          <div><strong>Categoria:</strong> {product.categoria}</div>
          <div><strong>Preço:</strong> R$ {product.preco.toFixed(2)}</div>
          <div><strong>Quantidade em Estoque:</strong> {product.estoque}</div>
          <div><strong>Código de Barras:</strong> {product.codigo_barras}</div>
          <div><strong>Marca:</strong> {product.marca}</div>
          <div><strong>Data de Fabricação:</strong> {product.data_fabricacao}</div>
          <div><strong>Data de Validade:</strong> {product.data_validade}</div>
          <div><strong>Status:</strong> {product.status}</div>
          <div><strong>Fornecedor:</strong> {product.fornecedor}</div>
        </div>
      </div>
    </div>
  );
}

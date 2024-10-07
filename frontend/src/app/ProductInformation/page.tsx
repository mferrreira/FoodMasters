/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Importando o useSearchParams
import api from '@/services/api';

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

export default function ProductInformation() {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); 

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const response = await api.get(`/api/users/gerente/produto/${id}`);
          if (!response) {
            throw new Error('Erro ao buscar os detalhes do produto');
          }
          const data: ProductDetails = await response.data;
          console.log(data)
          setProduct(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes do produto...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="bg-white mx-24 mt-6">
      <h1 className="text-3xl font-bold mb-4">Detalhes do Produto</h1>
      
      <div className="flex flex-col md:flex-row items-start md:items-center">

        <div className="md:w-1/4">
          <img src={product.imagem_url} alt={product.nome} className="w-full h-auto rounded-md" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:ml-6">
          <div><strong>Nome do Produto:</strong> {product.nome}</div>
          <div><strong>Descrição:</strong> {product.descricao}</div>
          <div><strong>Categoria:</strong> {product.categoria}</div>
          <div><strong>Preço:</strong> R$ {product.preco?.toFixed(2)}</div>
          <div><strong>Quantidade em Estoque:</strong> {product.estoque}</div>
          <div><strong>Código de Barras:</strong> {product.codigo_barras}</div>
          <div><strong>Marca:</strong> {product.marca}</div>
          <div><strong>Data de Fabricação:</strong> {new Date(product.data_fabricacao).toLocaleDateString('pt-BR')}</div>
          <div><strong>Data de Validade:</strong> {new Date(product.data_validade).toLocaleDateString('pt-BR')}</div>
          <div><strong>Status:</strong> {product.status}</div>
          <div><strong>Fornecedor:</strong> {product.fornecedor}</div>
        </div>
        
      </div>
    </div>
  );
}

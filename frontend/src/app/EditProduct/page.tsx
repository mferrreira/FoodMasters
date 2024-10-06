'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api';  // Importando a instância do Axios
import { useSearchParams } from 'next/navigation';  // Para obter o ID da URL

// Definindo a interface para os dados do produto
interface ProdutoDetails {
  id: string;
  nome: string;
  descricao: string;
  categoriaId: string;
  subcategoriaId: string;
  preco: string;
  estoque: string;
  codigo_barras: string;
  marca: string;
  data_fabricacao: string;
  data_validade: string;
  imagem: string;
  status: string;
  fornecedor: string;
}

export default function EditProduct() {
  const [produto, setProduto] = useState<ProdutoDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const codigo_barras = searchParams.get('id'); // Obtendo o id da URL

  console.log(codigo_barras);

  // UseEffect para buscar o produto quando o componente é montado
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        if (!codigo_barras) {
          setError('codigo_barras do produto não foi encontrado na URL');
          return;
        }
        const response = await api.get(`/api/produtos/${codigo_barras}`);
        console.log(response);
        setProduto(response.data);
      } catch (err) {
        setError('Erro ao buscar as informações do produto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [codigo_barras]);

  // Função para lidar com o envio do formulário
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!produto) return;

    const formData = new FormData(e.currentTarget);

    // Adicionando os dados do produto ao formData
    formData.append('nome', formData.get('nome') as string || produto.nome);
    formData.append('descricao', formData.get('descricao') as string || produto.descricao);
    formData.append('categoriaId', formData.get('categoriaId') as string || produto.categoriaId);
    formData.append('subcategoriaId', formData.get('subcategoriaId') as string || produto.subcategoriaId);
    formData.append('preco', formData.get('preco') as string || produto.preco);
    formData.append('estoque', formData.get('estoque') as string || produto.estoque);
    formData.append('codigo_barras', produto.codigo_barras); // Mantendo o código de barras
    formData.append('marca', formData.get('marca') as string || produto.marca);
    formData.append('data_fabricacao', formData.get('data_fabricacao') as string || produto.data_fabricacao);
    formData.append('data_validade', formData.get('data_validade') as string || produto.data_validade);
    formData.append('imagem', formData.get('imagem_url') as string || produto.imagem);
    formData.append('status', formData.get('status') as string || produto.status);
    formData.append('fornecedor', formData.get('fornecedor') as string || produto.fornecedor);

    try {
      await api.put(`/api/produtos/${produto.codigo_barras}`, formData);
      alert('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  }

  if (loading) {
    return <p>Carregando detalhes do produto...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!produto) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="mx-24 my-6 bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-6">Alterar informações do Produto</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nome do Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input
            type="text"
            name="nome"  // Adicionando o atributo name
            defaultValue={produto.nome}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite o nome do produto"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            name="descricao"  // Adicionando o atributo name
            defaultValue={produto.descricao}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite a descrição do produto"
          />
        </div>

        {/* CategoriaId */}
        <div>
          <label className="block text-sm font-medium text-gray-700">CategoriaId</label>
          <select name="categoriaId" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" defaultValue={produto.categoriaId}>
            <option value="">Escolha uma categoriaId</option>
            <option value="1">CategoriaId 1</option>
            <option value="2">CategoriaId 2</option>
          </select>
        </div>

        {/* SubcategoriaId */}
        <div>
          <label className="block text-sm font-medium text-gray-700">SubcategoriaId</label>
          <select name="subcategoriaId" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" defaultValue={produto.subcategoriaId}>
            <option value="">Escolha uma subcategoriaId</option>
            <option value="1">SubcategoriaId 1</option>
            <option value="2">SubcategoriaId 2</option>
          </select>
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="number"
            name="preco"  // Adicionando o atributo name
            defaultValue={produto.preco}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite o preço do produto"
          />
        </div>

        {/* Quantidade em Estoque */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
          <input
            type="number"
            name="estoque"  // Adicionando o atributo name
            defaultValue={produto.estoque}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite a quantidade em estoque"
          />
        </div>

        {/* Código de Barras */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Código de Barras</label>
          <input
            type="text"
            name="codigo_barras"  // Adicionando o atributo name
            defaultValue={produto.codigo_barras}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite o código de barras"
            readOnly  // Código de barras não deve ser editável
          />
        </div>

        {/* Marca */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <input
            type="text"
            name="marca"  // Adicionando o atributo name
            defaultValue={produto.marca}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite a marca"
          />
        </div>

        {/* Data de Fabricação */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Fabricação</label>
          <input
            type="date"
            name="data_fabricacao"  // Adicionando o atributo name
            defaultValue={produto.data_fabricacao}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Data de Validade */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
          <input
            type="date"
            name="data_validade"  // Adicionando o atributo name
            defaultValue={produto.data_validade}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Imagem */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Imagem</label>
          <input
            type="text"
            name="imagem_url"  // Adicionando o atributo name
            defaultValue={produto.imagem}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite a URL da imagem"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" defaultValue={produto.status}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        {/* Fornecedor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fornecedor</label>
          <input
            type="text"
            name="fornecedor"  // Adicionando o atributo name
            defaultValue={produto.fornecedor}  // Preenchendo com o valor atual
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Digite o fornecedor"
          />
        </div>

        {/* Botão de Envio */}
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-slate-600">
          Atualizar Produto
        </button>
      </form>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';  // Hook para capturar query params
import api from '@/services/api';  // Importando a instância do Axios

// Definindo a interface para os dados do vendedor
interface VendedorDetails {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  email: string;
  dataAdmissao: string;
  salario: number;
  status: string;
  setor: string;
}

export default function SellerInformation() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');  // Captura o parâmetro 'id' ou 'cpf'

  const [vendedor, setVendedor] = useState<VendedorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar os detalhes do vendedor
    const fetchVendedor = async () => {
      if (!id) return;  // Verifica se o ID ou CPF foi fornecido

      try {
        setLoading(true);
        setError(null);

        // Faz a requisição para a rota do backend responsável pelos vendedores, usando o ID ou CPF
        const response = await api.get(`/api/users/gerente/vendedor/${id}`);

        // Verifica se os dados existem e atualiza o estado
        if (response.data) {
          setVendedor({...response.data});
        } else {
          setError('Vendedor não encontrado');
        }

      } catch (err) {
        setError('Erro ao buscar as informações do vendedor');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendedor();
  }, [id]);  // Refaz a busca sempre que o ID ou CPF mudar

  if (loading) {
    return <p>Carregando detalhes do vendedor...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!vendedor) {
    return <p>Nenhum vendedor encontrado.</p>;
  }

  console.log(vendedor)

  return (
    <div className="bg-white mx-24 mt-6">
      <h1 className="text-3xl font-bold mb-4">Detalhes do Vendedor</h1>
      <div className="grid grid-cols-1 gap-4">
        <div><strong>Nome Completo:</strong> {vendedor.nomeCompleto}</div>
        <div><strong>CPF:</strong> {vendedor.cpf}</div>
        <div><strong>RG:</strong> {vendedor.rg}</div>
        <div><strong>Data de Nascimento:</strong> {new Date(vendedor.dataNascimento).toLocaleDateString('pt-BR')}</div>
        <div><strong>Endereço:</strong> {vendedor.endereco}</div>
        <div><strong>Telefone:</strong> {vendedor.telefone}</div>
        <div><strong>Email:</strong> {vendedor.email}</div>
        <div><strong>Data de Admissão:</strong> {new Date(vendedor.dataAdmissao).toLocaleDateString('pt-BR')}</div>
        <div><strong>Salário:</strong> R$ {vendedor.salario.toFixed(2)}</div>
        <div><strong>Status:</strong> {vendedor.status}</div>
        <div><strong>Setor:</strong> {vendedor.setor}</div>
      </div>
    </div>
  );
}

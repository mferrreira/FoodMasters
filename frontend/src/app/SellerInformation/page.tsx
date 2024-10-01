'use client';
import React, { useState, useEffect } from 'react';

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

// Dados fictícios do vendedor
const vendedorExemplo: VendedorDetails = {
  nomeCompleto: 'Carlos Pereira',
  cpf: '123.456.789-00',
  rg: '12.345.678-9',
  dataNascimento: '1985-09-15',
  endereco: 'Rua dos Vendedores, 456, Cidade Exemplo',
  telefone: '(11) 99876-5432',
  email: 'carlos.pereira@example.com',
  dataAdmissao: '2018-04-10',
  salario: 3200.00,
  status: 'Ativo',
  setor: 'Comercial',
};

export default function SellerInformation() {
  const [vendedor, setVendedor] = useState<VendedorDetails | null>(null);

  useEffect(() => {
    // Simulação de uma requisição para buscar os detalhes do vendedor
    setVendedor(vendedorExemplo);
  }, []);

  if (!vendedor) {
    return <p>Carregando detalhes do vendedor...</p>;
  }

  return (
    <div className="bg-white mx-24 mt-6">
      <h1 className="text-3xl font-bold mb-4">Detalhes do Vendedor</h1>
      <div className="grid grid-cols-1 gap-4">
        <div><strong>Nome Completo:</strong> {vendedor.nomeCompleto}</div>
        <div><strong>CPF:</strong> {vendedor.cpf}</div>
        <div><strong>RG:</strong> {vendedor.rg}</div>
        <div><strong>Data de Nascimento:</strong> {vendedor.dataNascimento}</div>
        <div><strong>Endereço:</strong> {vendedor.endereco}</div>
        <div><strong>Telefone:</strong> {vendedor.telefone}</div>
        <div><strong>Email:</strong> {vendedor.email}</div>
        <div><strong>Data de Admissão:</strong> {vendedor.dataAdmissao}</div>
        <div><strong>Salário:</strong> R$ {vendedor.salario.toFixed(2)}</div>
        <div><strong>Status:</strong> {vendedor.status}</div>
        <div><strong>Setor:</strong> {vendedor.setor}</div>
      </div>
    </div>
  );
}

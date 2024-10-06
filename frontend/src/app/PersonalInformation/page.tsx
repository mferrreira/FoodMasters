'use client';

import React, { useState, useEffect } from 'react';

interface DadosPessoais {
  nome_completo: string;
  cpf_cnpj: string;
  rg: string;
  data_nascimento: string;
  endereco: string;
  telefone: string;
  email: string;
  data_admissao: string;
  salario: number;
  status: string;
  setor: string;
}

export default function PersonalInformation() {
  const [dados, setDados] = useState<DadosPessoais | null>(null);

  useEffect(() => {
    // Buscando os dados pessoais do localStorage
    const dadosArmazenados = localStorage.getItem('user');
    if (dadosArmazenados) {
      setDados(JSON.parse(dadosArmazenados).user);
    }
  }, []);

  if (!dados) {
    return <p className="flex justify-center">Carregando informações pessoais...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Informações Pessoais</h1>
        <div className="grid grid-cols-1 gap-4">
          <div><strong>Nome Completo:</strong> {dados.nome_completo}</div>
          <div><strong>CPF:</strong> {dados.cpf_cnpj}</div>
          <div><strong>RG:</strong> {dados.rg}</div>
          <div><strong>Data de Nascimento:</strong> {dados.data_nascimento}</div>
          <div><strong>Endereço:</strong> {dados.endereco}</div>
          <div><strong>Telefone:</strong> {dados.telefone}</div>
          <div><strong>Email:</strong> {dados.email}</div>
          <div><strong>Data de Admissão:</strong> {dados.data_admissao}</div>
          <div><strong>Salário:</strong> R$ {dados.salario.toFixed(2)}</div>
          <div><strong>Status:</strong> {dados.status}</div>
          <div><strong>Setor:</strong> {dados.setor}</div>
        </div>
      </div>
    </div>
  );
}

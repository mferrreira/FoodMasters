'use client';

import React, { useState, useEffect } from 'react';

interface DadosPessoais {
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

const dadosExemplo: DadosPessoais = {
  nomeCompleto: 'João da Silva',
  cpf: '123.456.789-00',
  rg: '12.345.678-9',
  dataNascimento: '1990-05-20',
  endereco: 'Rua Exemplo, 123, Cidade Exemplo',
  telefone: '(11) 98765-4321',
  email: 'joao.silva@example.com',
  dataAdmissao: '2020-03-15',
  salario: 4500.00,
  status: 'Ativo',
  setor: 'Tecnologia',
};

export default function PersonalInformation() {
  const [dados, setDados] = useState<DadosPessoais | null>(null);

  useEffect(() => {
    // Simulação de requisição para buscar os dados pessoais.
    setDados(dadosExemplo);
  }, []);

  if (!dados) {
    return <p className="flex justify-center">Carregando informações pessoais...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Informações Pessoais</h1>
        <div className="grid grid-cols-1 gap-4">
          <div><strong>Nome Completo:</strong> {dados.nomeCompleto}</div>
          <div><strong>CPF:</strong> {dados.cpf}</div>
          <div><strong>RG:</strong> {dados.rg}</div>
          <div><strong>Data de Nascimento:</strong> {dados.dataNascimento}</div>
          <div><strong>Endereço:</strong> {dados.endereco}</div>
          <div><strong>Telefone:</strong> {dados.telefone}</div>
          <div><strong>Email:</strong> {dados.email}</div>
          <div><strong>Data de Admissão:</strong> {dados.dataAdmissao}</div>
          <div><strong>Salário:</strong> R$ {dados.salario.toFixed(2)}</div>
          <div><strong>Status:</strong> {dados.status}</div>
          <div><strong>Setor:</strong> {dados.setor}</div>
        </div>
      </div>
    </div>
  );
}

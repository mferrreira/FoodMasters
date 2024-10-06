"use client"

import { useEffect, useState } from "react";
import api from "@/services/api";
import {useSearchParams } from "next/navigation";

interface SellerData {
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

export default function EditSeller() {
    const [formData, setFormData] = useState<SellerData>({
        nomeCompleto: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        endereco: "",
        telefone: "",
        email: "",
        dataAdmissao: "",
        salario: 0,
        status: "Ativo",
        setor: "",
    });

    const searchParams = useSearchParams();
     const id = searchParams.get('id')

    // Função para buscar os dados do vendedor ao carregar a página
    useEffect(() => {
        const fetchSellerData = async () => {
            if (id) {
                try {
                    const response = await api.get(`/api/users/gerente/vendedor/${id}`);
                    setFormData(response.data); // Populando o formulário com os dados recebidos
                } catch (error) {
                    console.error("Erro ao carregar os dados do vendedor:", error);
                }
            }
        };
        fetchSellerData();
    }, [id]);

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para enviar os dados atualizados
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/users/gerente/vendedor/${id}`, formData);
            console.log("Vendedor atualizado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar vendedor:", error);
        }
    };

    return (
        <div className="mx-24 my-6 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-6">Alterar informações do Vendedor</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Nome Completo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input
                        type="text"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o nome completo"
                    />
                </div>

                {/* CPF */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o CPF"
                    />
                </div>

                {/* RG */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">RG</label>
                    <input
                        type="text"
                        name="rg"
                        value={formData.rg}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o RG"
                    />
                </div>

                {/* Data de Nascimento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Endereço */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Endereço</label>
                    <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o endereço"
                    />
                </div>

                {/* Telefone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o telefone"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o email"
                    />
                </div>

                {/* Data de Admissão */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Admissão</label>
                    <input
                        type="date"
                        name="dataAdmissao"
                        value={formData.dataAdmissao}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Salário */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Salário</label>
                    <input
                        type="number"
                        name="salario"
                        value={formData.salario}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o salário"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </div>

                {/* Setor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Setor</label>
                    <input
                        type="text"
                        name="setor"
                        value={formData.setor}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o setor"
                    />
                </div>

                {/* Botão de Submit */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-slate-600"
                    >
                        Alterar Vendedor
                    </button>
                </div>
            </form>
        </div>
    );
}

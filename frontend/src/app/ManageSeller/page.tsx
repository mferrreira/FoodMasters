'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoEye, IoAdd } from "react-icons/io5";
import api from "@/services/api";  // Importando a instância do Axios

interface Seller {
    cpf_cnpj: number;
    nome_completo: string;
    status: string;
    totalSales: number;
}

export default function ManageSeller() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Estado para guardar os vendedores
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [filteredSellers, setFilteredSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar os vendedores do backend
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Requisição para o backend
                const response = await api.get(`/api/users/gerente/vendedores/`);
                console.log(response)
                
                // Atualizando o estado com os vendedores recebcpf_cnpjos
                setSellers(response.data);  
                setFilteredSellers(response.data);  // Exibir todos os vendedores inicialmente
            } catch (err) {
                setError('Erro ao carregar a lista de vendedores');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSellers();
    }, [currentPage]);

    // Função de busca: filtra os vendedores apenas se houver termo de busca
    useEffect(() => {
        if (searchTerm) {
            setFilteredSellers(
                sellers.filter(seller =>
                    seller.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredSellers(sellers); // Se não houver busca, mostra todos os vendedores
        }
    }, [searchTerm, sellers]);

    // Função para deletar um vendedor (requisição ao backend)
    const handleDelete = async (cpf_cnpj: number) => {
        
        console.log(cpf_cnpj)
        try {
            // Chama a API para deletar o vendedor
            await api.delete(`/api/users/gerente/vendedores/${cpf_cnpj}`);
            // Atualiza o estado para remover o vendedor localmente
            setSellers(sellers.filter(seller => seller.cpf_cnpj !== cpf_cnpj));
        } catch (err) {
            setError('Erro ao excluir o vendedor');
            console.error(err);
        }
    };

    // Funções para mudar de página
    const handleNextPage = () => {
        if (currentPage < Math.ceil(sellers.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Carregando vendedores da página atual
    const currentSellers = filteredSellers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return <p>Carregando vendedores...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="mx-24 bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciamento de Vendedores</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Buscar vendedor..."
                    className="border border-gray-300 rounded-md py-2 px-3 mr-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link href="./RegisterSeller">
                    <button className="bg-black text-white py-2 px-4 rounded-md flex items-center">
                        <IoAdd className="mr-2" /> Adicionar Vendedor
                    </button>
                </Link>
            </div>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left">Nome</th>
                        <th className="border-b p-4 text-left">Status</th>
                        <th className="border-b p-4 text-left">Total de Vendas</th>
                        <th className="border-b p-4 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSellers.map(seller => (
                        <tr key={seller.cpf_cnpj} className="hover:bg-gray-100">
                            <td className="border-b p-4">{seller.nome_completo}</td>
                            <td className="border-b p-4">{seller.status}</td>
                            <td className="border-b p-4">{seller.totalSales}</td>
                            <td className="border-b p-4 flex space-x-2">
                                <Link href={`./EditSeller/?id=${seller.cpf_cnpj}`}>
                                    <button className="text-blue-500">
                                        <FiEdit />
                                    </button>
                                </Link>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(seller.cpf_cnpj)}
                                >
                                    <FiTrash />
                                </button>
                                <Link href={`./SellerInformation?id=${seller.cpf_cnpj}`}>
                                    <button className="text-blue-500">
                                        <IoEye />
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {Math.ceil(filteredSellers.length / itemsPerPage)}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredSellers.length / itemsPerPage)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                    Próxima
                </button>
            </div>
        </div>
    );
}

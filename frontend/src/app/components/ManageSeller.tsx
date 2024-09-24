'use client'
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoEye, IoAdd } from "react-icons/io5";

export default function ManageSeller() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const [sellers, setSellers] = useState([
        { id: 1, name: "João Silva", status: "Ativo", totalSales: 15 },
        { id: 2, name: "Maria Oliveira", status: "Inativo", totalSales: 8 },
        // Adicione mais vendedores conforme necessário
    ]);

    const filteredSellers = sellers.filter(seller =>
        seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);

    const handleDelete = (id: number) => {
        setSellers(sellers.filter(seller => seller.id !== id));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentSellers = filteredSellers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="mx-auto my-6 bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Vendedores</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Buscar vendedor..."
                    className="border border-gray-300 rounded-md py-2 px-3 mr-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-black text-white py-2 px-4 rounded-md flex items-center">
                    <IoAdd className="mr-2" /> Adicionar Vendedor
                </button>
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
                        <tr key={seller.id} className="hover:bg-gray-100">
                            <td className="border-b p-4">{seller.name}</td>
                            <td className="border-b p-4">{seller.status}</td>
                            <td className="border-b p-4">{seller.totalSales}</td>
                            <td className="border-b p-4 flex space-x-2">
                                <button className="text-blue-500">
                                    <FiEdit />
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(seller.id)}
                                >
                                    <FiTrash />
                                </button>
                                <button className="text-blue-500">
                                    <IoEye />
                                </button>
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
                    Página {currentPage} de {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                    Próxima
                </button>
            </div>
        </div>
    );
}

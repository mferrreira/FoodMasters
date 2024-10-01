'use client'
import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoEye, IoAdd } from "react-icons/io5";

export default function ManageSales() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    //a base de dados
    const [sellers, setSellers] = useState([
        { id: 1, name: "João Silva", DataCompra: "16/05/2024", ValorCompra: 1500 },
        { id: 2, name: "Maria Oliveira", DataCompra: "19/05/2024", ValorCompra: 1000},
        // Adicione mais vendedores conforme necessário
    ]);

    //O filtro
    const filteredSellers = sellers.filter(seller =>
        seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //Total de paginas
    const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);


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
        <div className="mx-24 bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciamento de Vendas</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Buscar vendedor..."
                    className="border border-gray-300 rounded-md py-2 px-3 mr-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
               
            </div>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left">Nome do Comprador</th>
                        <th className="border-b p-4 text-left">Data da Compra</th>
                        <th className="border-b p-4 text-left">Valor da Compra</th>
                        <th className="border-b p-4 text-left">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSellers.map(seller => (
                        <tr key={seller.id} className="hover:bg-gray-100">
                            <td className="border-b p-4">{seller.name}</td>
                            <td className="border-b p-4">{seller.DataCompra}</td>
                            <td className="border-b p-4">{seller.ValorCompra}</td>
                            <td className="border-b p-4 ">
                                <Link href="./ViewSales">
                                    <button className="text-blue-500">
                                        <IoEye className="h-6 w-6"/>
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
                    Página {currentPage} de {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                    Próxima
                </button>
            </div>
        </div>
    );
}

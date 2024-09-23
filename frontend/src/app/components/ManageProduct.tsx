'use client'
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoEye, IoAdd } from "react-icons/io5";

export default function ManageProduct() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const [products, setProducts] = useState([
        { id: 1, name: "Arroz", barcode: "1234567890123", stockQuantity: 50, price: 40 },
        { id: 2, name: "Feijão", barcode: "9876543210987", stockQuantity: 30, price: 25 },
        // Adicione mais produtos conforme necessário
        // Exemplo: { id: 3, name: "Produto 3", barcode: "0000000000000", stockQuantity: 10, price: 10 },
        // ... até 100 ou mais para testar a paginação
    ]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleDelete = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
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

    const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="mx-auto my-6 bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Produtos</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Buscar produto..."
                    className="border border-gray-300 rounded-md py-2 px-3 mr-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-black text-white py-2 px-4 rounded-md flex items-center">
                    <IoAdd className="mr-2" /> Adicionar Produto
                </button>
            </div>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left">Nome</th>
                        <th className="border-b p-4 text-left">Código de Barras</th>
                        <th className="border-b p-4 text-left">Quantidade em Estoque</th>
                        <th className="border-b p-4 text-left">Preço</th>
                        <th className="border-b p-4 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-100">
                            <td className="border-b p-4">{product.name}</td>
                            <td className="border-b p-4">{product.barcode}</td>
                            <td className="border-b p-4">{product.stockQuantity}</td>
                            <td className="border-b p-4">{product.price.toFixed(2)} R$</td>
                            <td className="border-b p-4 flex space-x-2">
                                <button className="text-blue-500">
                                    <FiEdit />
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(product.id)}
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

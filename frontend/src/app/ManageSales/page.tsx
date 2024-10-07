'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoEye } from "react-icons/io5";
import api from "@/services/api";

interface VendaProduto {
    vendaId: string;
    produtoId: string;
    quantidade: number;
    preco_unitario: number;
}

interface Venda {
    numero_pedido: string;
    data_venda: string; // Pode ser um Date, se você preferir
    nome_cliente: string;
    cpf_cnpj_cliente: string;
    valor_total: number;
    desconto: number;
    valor_final: number | null; // pode ser null
    forma_pagamento: string;
    status_venda: string;
    data_entrega: string; // Pode ser um Date, se você preferir
    endereco_entrega: string;
    vendedorId: string;
    Venda_Produto: VendaProduto[];
}


export default function ManageSales() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [sales, setSales] = useState<Venda[]>([]); // Use a interface Venda
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await api.get('/api/vendas'); // Ajuste conforme a sua rota
                setSales(response.data.vendas); // Acesse o array de vendas corretamente
            } catch (err) {
                setError("Erro ao buscar vendas");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const filteredSales = sales.filter(sale =>
        sale.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

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

    const currentSales = filteredSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mx-24 bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciamento de Vendas</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Buscar comprador..."
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
                    {currentSales.map(sale => (
                        <tr key={sale.numero_pedido} className="hover:bg-gray-100">
                            <td className="border-b p-4">{sale.nome_cliente}</td>
                            <td className="border-b p-4">{new Date(sale.data_venda).toLocaleDateString()}</td>
                            <td className="border-b p-4">{sale.valor_total.toFixed(2)}</td>
                            <td className="border-b p-4">
                                <Link href={`./SaleDetail?id=${sale.numero_pedido}`}>
                                    <button className="text-blue-500">
                                        <IoEye className="h-6 w-6" />
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

"use client"

import { useEffect, useState } from "react";
import api from "@/services/api";

interface ProdutoMaisVendido {
    produtoId: string;
    _sum: {quantidade: number};
}

interface VendedorMaisAtivo {
    vendedorId: string;
    _count: {numero_pedido: number};
}

export default function GerenteDashboard() {
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState<ProdutoMaisVendido[]>([]);
    const [vendedoresMaisAtivos, setVendedoresMaisAtivos] = useState<VendedorMaisAtivo[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const produtosResponse = await api.get("/api/vendas/top/produto");
                setProdutosMaisVendidos(produtosResponse.data);

                const vendedoresResponse = await api.get("/api/vendas/top/vendedor");
                setVendedoresMaisAtivos(vendedoresResponse.data);

                console.log(produtosResponse.data)
                console.log(vendedoresResponse.data)
            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-5xl font-bold mb-10">Resumo</h1>

            <div className="w-full max-w-4xl mb-10">
                <h2 className="text-3xl font-semibold mb-4">Produtos Mais Vendidos</h2>
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Produto ID</th>
                            <th className="border p-2">Quantidade Vendida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosMaisVendidos.map((produto) => (
                            <tr key={produto.produtoId} className="border-b">
                                <td className="border p-2">{produto.produtoId}</td>
                                <td className="border p-2">{produto._sum.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-semibold mb-4">Vendedores Mais Ativos</h2>
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Vendedor ID</th>
                            <th className="border p-2">Número de Vendas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendedoresMaisAtivos.map((vendedor) => (
                            <tr key={vendedor.vendedorId} className="border-b">
                                <td className="border p-2">{vendedor.vendedorId}</td>
                                <td className="border p-2">{vendedor._count.numero_pedido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

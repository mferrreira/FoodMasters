'use client'
import { useEffect, useState } from "react";
import api from "@/services/api";
import {CardProducts} from "@/app/components/CardProducts"
import { useSearchParams } from "next/navigation";

interface Sale {
    numero_pedido: string;
    data_venda: string;
    nome_cliente: string;
    cpf_cnpj_cliente: string;
    valor_total: number;
    desconto: number;
    valor_final: number | null;
    forma_pagamento: string;
    status_venda: string;
    data_entrega: string;
    endereco_entrega: string;
    vendedorId: string;
    Venda_Produto: {
        vendaId: string;
        produtoId: string;
        quantidade: number;
        preco_unitario: number;
    }[];
}

export default function SaleDetails() {
    const params = useSearchParams();
    const id  = params.get("id");

    const [sale, setSale] = useState<Sale | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSaleDetails = async () => {
            if (!id) return;

            try {
                const response = await api.get(`/api/vendas/${id}`);
                setSale(response.data.venda);
            } catch (err) {
                setError("Erro ao buscar detalhes da venda");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleDetails();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mx-24 bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Detalhes da Venda: {sale?.numero_pedido}</h2>
            <div>
                <p><strong>Nome do Comprador:</strong> {sale?.nome_cliente}</p>
                <p><strong>CPF/CNPJ:</strong> {sale?.cpf_cnpj_cliente}</p>
                <p><strong>Data da Venda:</strong> {new Date(sale?.data_venda).toLocaleDateString()}</p>
                <p><strong>Valor Total:</strong> R$ {sale?.valor_total.toFixed(2)}</p>
                <p><strong>Desconto:</strong> R$ {sale?.desconto.toFixed(2)}</p>
                <p><strong>Valor Final:</strong> R$ {sale?.valor_final ? sale.valor_final.toFixed(2) : "N/A"}</p>
                <p><strong>Forma de Pagamento:</strong> {sale?.forma_pagamento}</p>
                <p><strong>Status da Venda:</strong> {sale?.status_venda}</p>
                <p><strong>Data de Entrega:</strong> {new Date(sale?.data_entrega).toLocaleDateString()}</p>
                <p><strong>Endereço de Entrega:</strong> {sale?.endereco_entrega}</p>
                <p><strong>ID do Vendedor:</strong> {sale?.vendedorId}</p>
            </div>
            <h3 className="text-xl font-bold mt-4">Produtos da Venda:</h3>
            <div className="grid grid-cols-1 gap-4">
                {sale?.Venda_Produto.map(product => (
                    <CardProducts key={product.produtoId} codigo_barras={product?.produtoId} nome={product.nome} preco={product.preco_unitario} imageUrl={product.image_url} showAddToCart={false}/>
                ))}
            </div>
        </div>
    );
}

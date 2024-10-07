"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { Divider } from "@/app/components/Divider";

export default function Checkout() {
    const [formData, setFormData] = useState({
        nomeCliente: "",
        cpfCliente: "",
        enderecoEntrega: "",
        dataEntrega: "",
        vendedorId: JSON.parse(localStorage.getItem("user")).user.cpf_cnpj,
        valorTotal: 0,
        desconto: 0,
        valorFinal: 0,
        formaPagamento: "Dinheiro", // Opção padrão
        statusVenda: "Pendente", // Opção padrão
    });

    const [produtos, setProdutos] = useState<any[]>([]);
    
    useEffect(() => {
        // Recupera os dados do carrinho do localStorage
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            const cart = JSON.parse(cartData);
            setProdutos(cart); // Armazena os produtos do carrinho
            calcularTotal(cart); // Calcula o total ao carregar os produtos
        }
    }, []);

    const calcularTotal = (produtos: any[]) => {
        const total = produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
        const desconto = 0; // Aqui você pode adicionar lógica para descontos
        setFormData(prev => ({
            ...prev,
            valorTotal: total,
            valorFinal: total - desconto,
            desconto: desconto
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Adiciona a lógica para a venda no backend
        try {
            await api.post("/api/vendas", {
                ...formData,
                produtos, // Os produtos do carrinho
            });
            // Limpa o carrinho após a venda
            localStorage.removeItem("cart");
            // Redireciona ou exibe uma mensagem de sucesso
            alert("Venda realizada com sucesso");
        } catch (error) {
            console.error("Erro ao finalizar a venda:", error);
        }
    };

    return (
        <div className="w-full max-w-[600px] mx-auto p-6 border rounded-lg bg-white shadow-md">
            <h1 className="text-3xl font-bold mb-4">Finalizar Compra</h1>
            <Divider />
            <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                    <label htmlFor="nomeCliente" className="block text-sm font-semibold">Nome do Cliente:</label>
                    <input
                        type="text"
                        id="nomeCliente"
                        name="nomeCliente"
                        value={formData.nomeCliente}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cpfCliente" className="block text-sm font-semibold">CPF do Cliente:</label>
                    <input
                        type="text"
                        id="cpfCliente"
                        name="cpfCliente"
                        value={formData.cpfCliente}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="enderecoEntrega" className="block text-sm font-semibold">Endereço de Entrega:</label>
                    <input
                        type="text"
                        id="enderecoEntrega"
                        name="enderecoEntrega"
                        value={formData.enderecoEntrega}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dataEntrega" className="block text-sm font-semibold">Data de Entrega:</label>
                    <input
                        type="date"
                        id="dataEntrega"
                        name="dataEntrega"
                        value={formData.dataEntrega}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                {/* Campos adicionais conforme necessário */}
                
                <div className="mb-4">
                    <label htmlFor="formaPagamento" className="block text-sm font-semibold">Forma de Pagamento:</label>
                    <select
                        id="formaPagamento"
                        name="formaPagamento"
                        value={formData.formaPagamento}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                        <option value="Cartão de Débito">Cartão de Débito</option>
                    </select>
                </div>

                <div className="flex justify-between mt-6">
                    <span className="font-semibold">Valor Total: R$ {formData.valorTotal.toFixed(2)}</span>
                    <span className="font-semibold">Valor Final: R$ {formData.valorFinal.toFixed(2)}</span>
                </div>

                <button type="submit" className="mt-6 h-14 w-full rounded-[62px] border bg-black text-white">Finalizar Venda</button>
            </form>
        </div>
    );
}

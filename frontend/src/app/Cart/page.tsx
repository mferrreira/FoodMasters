"use client";

import CartProducts from "../components/CartProducts";
import { Divider } from "../components/Divider";
import { OrderSummary } from "../components/OrderSummary";
import { useCart } from "@/context/CartContext"; // Importando o contexto do carrinho

export default function Cart() {
    const { cart } = useCart(); // Usando o contexto para obter os itens do carrinho

    return (
        <div className="mx-[100px]">
            <h2 className="text-[2.5rem] font-bold my-6">Seu Carrinho</h2>
            <div className="flex justify-between gap-5">
                <div className="border border-[#F0EEED] w-[715px] p-6 rounded-[20px] h-min">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={item.codigo_barras}>
                                <CartProducts item={item} />
                                {index < cart.length - 1 && <Divider />} {/* Adiciona o Divider apenas entre os produtos */}
                            </div>
                        ))
                    ) : (
                        <p>Seu carrinho está vazio.</p>
                    )}
                </div>
                <div className="border border-[#F0EEED] w-[505px] p-6 rounded-[20px] h-min">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}

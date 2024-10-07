import { useCart } from "@/context/CartContext"; // Importando o contexto do carrinho
import Link from "next/link";
import Checkout from "../Checkout/page";

export function OrderSummary() {
    const { cart } = useCart();

    // Calculando o subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Resumo do Pedido</h3>
            <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>R${subtotal.toFixed(2)}</p>
            </div>
            {/* Implementar o cálculo de descontos, taxas e total geral aqui */}
            <button className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-slate-600">
                <Link href={'/Checkout'}>
                Finalizar Compra
                </Link> 
            </button>
        </div>
    );
}

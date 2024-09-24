import CartProducts from "../components/CartProducts";
import { Divider } from "../components/Divider";
import { OrderSummary } from "../components/OrderSummary";

export default function Cart() {
    return (
        <div className="mx-[100px]">
            <h2 className="text-[2.5rem] font-bold my-6">Seu Carrinho</h2>
            <div className="flex justify-between gap-5"> {/* Adicionei a classe gap-5 aqui */}
                <div className="border border-[#F0EEED] w-[715px] p-6 rounded-[20px] h-min">
                    <CartProducts />
                    <div className="my-6">
                        <Divider />
                    </div>
                    <CartProducts />
                    <div className="my-6">
                        <Divider />
                    </div>
                    <CartProducts />
                    <div className="my-6">
                        <Divider />
                    </div>
                    <CartProducts />
                </div>
                <div className="border border-[#F0EEED] w-[505px] p-6 rounded-[20px] h-min">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}

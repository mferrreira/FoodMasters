import { Divider } from "./Divider";

export function OrderSummary(){
    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <dd>
                <ul className="flex justify-between mb-5">
                    <li className="text-xl text-[#9A9A9A]">Subtotal</li>
                    <li className="text-xl font-bold">$500</li>
                </ul>
                <ul className="flex justify-between mb-5">
                    <li className="text-xl text-[#9A9A9A]">Desconto</li>
                    <li className="text-xl font-bold text-[#FF3333]">$50</li>
                </ul>
                <div className="my-5">
                    <Divider />
                </div>
                <ul className="flex justify-between mb-5">
                    <li className="text-xl text-[#9A9A9A]">Total</li>
                    <li className="text-xl font-bold">$450</li>
                </ul>
            </dd>
            <button className="w-[456px] h-[60px] bg-black text-white rounded-[4rem]">Finalizar Compra</button>
        </div>
    )
}
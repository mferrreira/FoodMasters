import { CardProducts } from "./CardProducts";
import api from "@/services/api";

interface PromotionProps {
    title: string;
}
export function Promotion({title} : PromotionProps) {

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-5xl font-bold mb-14 text-center">{title}</h2>
            <div className="flex justify-between w-[925px]">
                <CardProducts />
                <CardProducts />
                <CardProducts />
            </div>
            <button className="h-14 w-52 rounded-[62px] border mt-9">Ver mais</button>
        </div>
    );
}

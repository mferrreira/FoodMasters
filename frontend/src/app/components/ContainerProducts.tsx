import { Divider } from "./Divider";
import { Promotion } from "./Promotion";

export function ContainerProducts() {
    return (
        <div className="w-[925px] p-12">
            {/* Seção de Promoções */}
            <Promotion title="Promoções" type="promotion" limit={3} />

            <div className="mt-9 mb-16">
                <Divider />
            </div>

            {/* Seção de Mais Vendidos */}
            <Promotion title="Mais Vendidos" type="bestsellers" limit={3} />
        </div>
    );
}

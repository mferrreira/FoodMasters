import { Divider } from "./Divider";
import { Promotion } from "./Promotion";

export function ContainerProducts(){
    return(
        <div className="w-[925px]">
            <Promotion title="Promoções"/>
            <div className="mt-9 mb-16">
                <Divider />
            </div>
            <Promotion title="Mais Vendidos"/>
        </div>
    )
}
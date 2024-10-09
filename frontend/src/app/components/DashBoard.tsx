import { Filter } from "./Filter";
import { ContainerProducts } from "./ContainerProducts";

export default function DashBoard() {
    return (
        <div className="w-auto max-w-[77.5rem] text-center mx-[100px]">
            <h1 className="text-[2rem] font-bold py-5">Dashboard</h1>
            <div className="flex justify-between">
                <div className="w-18 text-center">
                    <Filter />
                </div>
                <ContainerProducts />
            </div>
        </div>
    );
}
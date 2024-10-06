import { Filter } from "./Filter"
import { ContainerProducts } from "./ContainerProducts"

export default function GerenteDashboard() {
     return (
        <div className="w-auto max-w-[77.5rem] mx-[100px]">
         
            <h1 className="text-[2rem] font-bold py-5">Home</h1>
         
         <div className="flex justify-between">
            <Filter />
            <ContainerProducts/>
        </div> 
        </div>
     )
}
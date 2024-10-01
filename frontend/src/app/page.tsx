import { ContainerProducts } from "./components/ContainerProducts";
import { Filter } from "./components/Filter";


export default function Home() {
  return (
    <main className="w-auto max-w-[77.5rem] mx-[100px]">
      <h1 className="text-[2rem] font-bold py-5">Home</h1>
      
      <div className="flex justify-between">
        <Filter />
        <ContainerProducts/>
      </div>
       
    </main>
  )
}

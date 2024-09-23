import { CardProducts } from "./components/CardProducts";
import { ContainerProducts } from "./components/ContainerProducts";
import EditSeller from "./components/EditSeller";
import { Filter } from "./components/Filter";
import ManageProduct from "./components/ManageProduct";
import ManageSeller from "./components/ManageSeller";
import RegisterSeller from "./components/RegisterSeller";
import ProductForm from "./components/RegistrationProduct";

export default function Home() {
  return (
    <main className="w-auto max-w-[77.5rem] mx-[100px]">
      {/**
       * <h1 className="text-[2rem] font-bold py-5">Home</h1>
      
      <div className="flex justify-between">
        <Filter />
        <ContainerProducts/>
      </div>
       */}
      <ManageSeller />
    </main>
  )
}

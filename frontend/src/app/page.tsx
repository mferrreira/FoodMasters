"use client"

import { UserProvider, useUser } from "@/context/UserContext";
import { ContainerProducts } from "./components/ContainerProducts";
import { Filter } from "./components/Filter";
import Login from "@/app/components/Login";
import DashBoard from "@/app/components/DashBoard";
import GerenteDashboard from "@/app/components/GerenteDashboard";

export default function Home() {
  const { isAuthenticated, user } = useUser();
  
  return (

      <main className="w-auto max-w-[77.5rem] mx-[100px]">

      {
            isAuthenticated 
            ? (user?.user?.is_vendedor === true 

                ? <DashBoard /> 
                : <GerenteDashboard />) 
            
            : <Login />
      }
        
      </main>
  )
}

'use client';

import { IoSearch } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { LuUserCircle2 } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext"; // Importando o contexto de usuário

export function Header() {
    const { user, isAuthenticated, logout } = useUser(); // Desestruturando o contexto
    const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para controle da exibição do menu

    const handleUserMenuToggle = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    return (

        
        <div className="flex flex-row items-center justify-between mx-24 my-6">
            <div className="w-full flex justify-between mr-6">
                <Link href="/">
                    <h1 className="text-2xl font-bold">FoodMaster</h1>
                </Link>

                <form className="relative inline-block w-full md:w-auto">
                    <input type="text" className="h-12 w-full md:w-[576px] rounded-full border-none box-border text-base bg-gray-200 pl-12" placeholder="Search for products..." id="searchInput" />
                    <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">
                        <IoSearch className="text-gray-400 w-6 h-6" />
                    </button>
                </form>
            </div>
        {isAuthenticated && (
            <div className="flex flex-row w-16 justify-between">
                <div className="relative">
                    <Link href="../Cart/">
                        <button className="border-none rounded-full bg-white cursor-pointer">
                            <PiShoppingCartSimpleBold className="w-6 h-6" />
                        </button>
                    </Link>
                </div>
                <div className="relative">
                    <button 
                        className="border-none rounded-full bg-white cursor-pointer" 
                        onClick={handleUserMenuToggle}
                    >
                        <LuUserCircle2 className="w-6 h-6" />
                    </button>
                    
                    {/* Menu Dropdown */}
                    {isMenuVisible && (
                        <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-md w-52 p-4 text-center">
                            <Link href="./PersonalInformation/">
                                <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Informações Pessoais</p>
                            </Link>
                            <Link href="../ManageSales/">
                                <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Gerenciamento Vendas</p>
                            </Link>
                            {/* Exibir opções adicionais para Gerente */}
                            {user?.user?.is_vendedor == false ? (
                                <>
                                    <Link href="../ManageProduct/">
                                        <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Gerenciar Produtos</p>
                                    </Link>
                                    <Link href="../ManageSeller/">
                                        <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Gerenciar Vendedores</p>
                                    </Link>
                                </>
                            ) : <></> }

                                <button 
                                    onClick={() => logout()} 
                                    className="text-red-500 cursor-pointer mt-2 hover:text-red-600"
                                >
                                    Sair
                                </button>
                        </div>
                    )} 
                </div>
                  </div>)}
        </div> 
    ) 
}

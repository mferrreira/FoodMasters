'use client';

import { IoSearch } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { LuUserCircle2 } from "react-icons/lu";
import { useState } from "react";

export function Header() {
    const [SelectItem, setSelectItem] = useState('');
    const [User, setUser] = useState<'Gerente' | 'Vendedor' | ''>('Gerente'); // Simulação do tipo de usuário
    const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para controle da exibição do menu

    const handleClick = (item: string) => {
        setSelectItem(item);
    };

    const handleUserMenuToggle = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <div className="flex flex-row items-center justify-between mx-24 my-6">
            <h1 className="text-2xl font-bold">FoodMaster</h1>
            
            <div className="flex flex-row w-80 justify-between">
                <div className="flex flex-row items-center">
                    <p onClick={() => handleClick('On Sale')} className={`cursor-pointer text-base ${SelectItem === 'On Sale' ? 'font-semibold' : ''}`}>On Sale</p>
                    <img className="w-4 h-4 cursor-pointer" alt="image vector" />
                </div>
                <p onClick={() => handleClick('New Arrivals')} className={`cursor-pointer text-base ${SelectItem === 'New Arrivals' ? 'font-semibold' : ''}`}>New Arrivals</p>
                <p onClick={() => handleClick('Brands')} className={`cursor-pointer text-base ${SelectItem === 'Brands' ? 'font-semibold' : ''}`}>Brands</p>
            </div>

            <form className="relative inline-block w-full md:w-auto">
                <input type="text" className="h-12 w-full md:w-[576px] rounded-full border-none box-border text-base bg-gray-200 pl-12" placeholder="Search for products..." id="searchInput" />
                <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">
                    <IoSearch className="text-gray-400 w-6 h-6" />
                </button>
            </form>

            <div className="flex flex-row w-16 justify-between">
                <div className="relative">
                    <button className="border-none rounded-full bg-white cursor-pointer">
                        <PiShoppingCartSimpleBold className="w-6 h-6" />
                    </button>
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
                            <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Informações Pessoais</p>
                            <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Gerenciar Vendas</p>
                            {/* Exibir opções adicionais para Gerente */}
                            {User === 'Gerente' && (
                                <>
                                    <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Gerenciar Produtos</p>
                                    <p className="text-black cursor-pointer hover:text-[#9A9A9A]">Gerenciar Vendedores</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

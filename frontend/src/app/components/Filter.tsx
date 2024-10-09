'use client'; // Adicione esta linha para tornar este um componente de cliente

import { useState } from "react";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { Divider } from "./Divider";
import { IoIosArrowDown } from "react-icons/io";

type Category = "Bebidas" | "Cereais" | "Congelados" | "Grãos" | "Limpeza" | "Massas" | "Utensílios";

const categoryItems: Record<Category, string[]> = {
    "Bebidas": [
        "Alcoólicas",
        "Refrigerantes",
        "Sucos",
        "Águas",
        "Energéticos",
        "Laticínios",
        "Isotônicos",
    ],
    "Cereais": [
        "Matinais",
        "Integrais",
        "Flocos de Milho",
        "Farelos e Fibras",
    ],
    "Congelados": [
        "Legumes",
        "Frutas",
        "Carnes",
        "Comidas Congeladas",
        "Salgados",
        "Sobremesas"
    ],
    "Grãos": [
        "Arroz",
        "Feijão",
        "Lentilhas",
        "Grão-de-bico",
        "Ervilhas",
        "Milho e Quinoa"
    ],
    "Limpeza": [
        "Cozinha",
        "Banheiro",
        "Roupas",
        "Multiusos",
        "Esponjas e Panos",
        "Pessoal"
    ],
    "Massas": [
        "Secas",
        "Instantâneas",
        "Recheadas"
    ],
    "Utensílios": [
        "Cozinha",
        "Caçarolas",
        "Talheres",
        "Forno",
        "Bebidas",
        "Limpeza"
    ],
};

export function Filter() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const categories: Category[] = [
        "Bebidas",
        "Cereais",
        "Congelados",
        "Grãos",
        "Limpeza",
        "Massas",
        "Utensílios",
    ];

    const handleCategoryClick = (category: Category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null); // Colapsar se já estiver expandido
        } else {
            setExpandedCategory(category); // Expandir a nova categoria
        }
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item); // Definir o item selecionado
    };

    return (
        <div className="w-[18.4rem] border border-[#F0EEED] rounded-[20px] p-6 py-5 mr-5s">
            <div className="flex justify mb-6">
                <h2 className="text-xl font-bold">Filtro</h2>
                <HiAdjustmentsVertical className="w-6 h-6 text-[#999999]" />
            </div>
            <Divider />
            <dl className="mt-6">
                {categories.map((category) => (
                    <div key={category}>
                        <dt
                            className="flex justify-between mb-5 cursor-pointer"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <p className={`text-base ${expandedCategory === category ? 'text-black font-bold' : 'text-[#B2B2B2]'}`}>
                                {category}
                            </p>
                            <IoIosArrowDown
                                className={`w-4 h-4 transition-transform duration-300 text-[#B2B2B2] ${expandedCategory === category ? 'rotate-180 text-black' : ''}`}
                            />
                        </dt>
                        {expandedCategory === category && (
                            <dd className="pl-4 text-base text-[#B2B2B2]">
                                <ul>
                                    {categoryItems[category].map((item) => (
                                        <li 
                                            key={item}
                                            onClick={() => handleItemClick(item)}
                                            className={`mb-2 cursor-pointer ${selectedItem === item ? 'text-black font-bold' : 'text-[#B2B2B2]'}`}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        )}
                    </div>
                ))}
            </dl>
        </div>
    );
}

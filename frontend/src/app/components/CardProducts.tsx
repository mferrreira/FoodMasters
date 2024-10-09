/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";
import { useCart } from "@/context/CartContext"; // Importando o contexto do carrinho

interface ProductInfo {
    codigo_barras: number;
    nome: string;
    preco: number;
    desconto?: number;
    imageUrl: string;
    showAddToCart: boolean
}

export function CardProducts({ codigo_barras, nome, preco, desconto = 0, imageUrl, showAddToCart = true }: ProductInfo, ) {
    const { addToCart } = useCart(); // Função para adicionar ao carrinho
    const [quantidade, setQuantidade] = useState(1);

    const finalPrice = preco - (preco * (desconto / 100));

    const handleAddToCart = () => {
        addToCart({
            codigo_barras,
            nome,
            preco: finalPrice,
            quantidade,
            vendedor_id: JSON.parse(localStorage.getItem('user')).user.cpf_cnpj,
        });
    };

    return (
        <div className="w-[17.4rem] mx-4">
            <div className="w-[17.4rem] h-[18.6rem] flex justify-center bg-[#F0EEED] rounded-[1.2rem]">
                <img 
                    src={imageUrl} 
                    alt={`${nome} image`} 
                    className="w-[17.4rem] h-[18.6rem] rounded-[1.2rem]" 
                />
            </div>
            <div className="mt-4">
                <p className="font-satoshi text-[1.2rem] font-bold truncate">{nome}</p>

                {desconto ? (
                    <div className="flex items-center">
                        <p className="font-satoshi text-[1.5rem] font-bold mt-2 leading-none mr-[10px]">
                            R${finalPrice.toFixed(2)}
                        </p>
                        <p className="font-satoshi text-[1.5rem] text-[#999999] font-bold mt-2 leading-none mr-[10px] line-through">
                            R${preco?.toFixed(2)}
                        </p>
                        <p className="flex bg-[#FFEBEB] text-[#FF3333] text-xs rounded-[62px] w-14 h-6 justify-center items-center">
                            -{desconto}%
                        </p>
                    </div>
                ) : (
                    <p className="font-satoshi text-[1.5rem] font-bold mt-2 leading-none mr-[10px]">
                        R${preco?.toFixed(2)}
                    </p>
                )}

                {showAddToCart === true ? 
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white my-4 py-2 px-4 rounded-md shadow hover:bg-slate-600"
                >
                    Adicionar ao Carrinho
                </button>
                : <div></div>}
            </div>
        </div>
    );
}

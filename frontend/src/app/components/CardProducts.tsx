/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from "react";

interface ProductInfo {
    
}

export function CardProducts() {
    const [Discount, setDiscount] = useState(0);
    const valor = 92;

    return (
        <div className="w-[17.4rem]">
            <div className="w-[17.4rem] h-[18.6rem] flex justify-center bg-[#F0EEED] rounded-[1.2rem]">
                <img 
                    src="" 
                    alt="image products" 
                    className="w-[17.4rem] h-[18.6rem] rounded-[1.2rem]" 
                />
            </div>
            <div className="mt-4">
                <p className="font-satoshi text-[1.2rem] font-bold truncate">Arroz Codil Tipo 1</p>
                {/* Se o desconto for 0 ou null, exibe apenas o preço normal */}
                {Discount ? (
                    <div className="flex items-center">
                        <p className="font-satoshi text-[1.5rem] font-bold mt-2 leading-none mr-[10px]">
                            R${(valor - (valor * (Discount / 100))).toFixed(2)}
                        </p>
                        <p className="font-satoshi text-[1.5rem] text-[#999999] font-bold mt-2 leading-none mr-[10px] line-through">
                            R${valor.toFixed(2)}
                        </p>
                        <p className="flex bg-[#FFEBEB] text-[#FF3333] text-xs rounded-[62px] w-14 h-6 justify-center items-center">
                            -{Discount}%
                        </p>
                    </div>
                ) : (
                    <p className="font-satoshi text-[1.5rem] font-bold mt-2 leading-none mr-[10px]">
                        R${valor.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
}

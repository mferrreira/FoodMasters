'use client'
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { Divider } from "../components/Divider";
import { useState } from "react";

interface ProductProps {
    title: String,
    price: Number,
    description: String,
}

export default function Detail(info: ProductProps){
    const [Discount, setDiscount] = useState(10);

    return(
        <div className="mx-[100px]">
            <h2 className="text-[2.5rem] font-bold my-10">Detalhes</h2>
            <dd className="flex justify-between">
                <ul className="w-[444px] h-[530px] bg-[#F0EEED] rounded-[20px]  flex justify-center items-center">
                    <li>ola</li>
                </ul>
                <ul className="w-[600px] flex flex-col justify-between ">
                    <h3 className="text-[2.5rem] font-bold break-words">Arroz</h3>
                    {Discount ? (
                        <ul className="flex items-center">
                            <li className="text-[32px] font-bold mr-3">$40</li>
                            <li className="text-[32px] font-bold text-[#9A9A9A] line-through mr-3">$100</li>
                            <li className="flex bg-[#FFEBEB] text-[#FF3333] text-xs rounded-[62px] w-14 h-6 justify-center items-center">%{Discount}</li>
                        </ul>
                ) : (
                    <li className="text-[32px] font-bold mr-3">$40</li>
                )}
                    <div className="">
                        <Divider />
                    </div>
                    <li className="text-base text-[#999999] break-words">Lorem ipsum dolor sit amet consectetur adipisicing elit.fdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</li>
                    <div className="">
                        <Divider />
                    </div>
                    <li>
                        <h3 className="text-base text-[#999999] mb-4">Marca</h3>
                        <ul className="flex ">
                            <li className="text-base text-[#999999] bg-[#F0F0F0] rounded-[62px] p-3">Codil</li>
                        </ul>
                    </li>
                    <div className="">
                        <Divider />
                    </div>
                    <li>
                        <ul className="flex justify-between">
                            <li className="flex bg-[#F0F0F0] w-[170px] h-[52px] py- px-5 items-center justify-between rounded-3xl">
                                <IoAddOutline
                                className="text-lg cursor-pointer h-6 w-6"
                                />
                                <p className="text-lg">1</p>
                                <IoRemoveOutline
                                    className="text-lg cursor-pointer h-6 w-6"
                                />
                            </li>

                            <li>
                                <button className="text-white bg-black w-[400px] h-[52px] rounded-[62px]">Adicionar ao Carrinho</button>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            </dd>

        </div>
    )
} 
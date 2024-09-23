'use client'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Divider } from "./Divider";

import Image from 'next/image';
import Visa from "../../../public/images/Visa.svg"
import Gpay from "../../../public/images/G Pay.svg"
import Apay from "../../../public/images/ Pay.svg"
import  Paypal from "../../../public/images/Paypal.svg"
import  MasterCard from "../../../public/images/Mastercard.svg"

export function Footer(){
    return(
        <div className="max-w-full py-12 bg-[#F0F0F0] mt-20">
            <ul className="flex mx-[100px] justify-between">
                <dd className="w-[248px]">
                    <h2 className="text-3xl font-bold mb-6">FoodMaster</h2>
                    <p className="text-[#9A9A9A] text-sm mb-9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste incidunt aspernatur dolores.</p>
                    <ul className="flex">
                        <li>
                            <FaXTwitter className="border h-7 w-7 rounded-[100%] bg-white mr-3"/>
                        </li>
                        <li>
                            <FaFacebookF className="border h-7 w-7 rounded-[100%] text-white bg-black mr-3"/>
                        </li>
                        <li>
                            <FaInstagram className="border h-7 w-7 rounded-[100%] bg-white"/>
                        </li>
                    </ul>
                </dd>
                <dd>
                    <h2 className="text-16 font-bold mb-6">Empresa</h2>
                    <ul className="h-[8.5rem] flex flex-col justify-between">
                        <li className="text-sm text-[#9A9A9A]">Sobre</li>
                        <li className="text-sm text-[#9A9A9A]">Características</li>
                        <li className="text-sm text-[#9A9A9A]">Funciona</li>
                        <li className="text-sm text-[#9A9A9A]">Cuidado</li>
                    </ul>
                </dd>
                <dd>
                    <h2 className="text-16 font-bold mb-6">Ajuda</h2>
                    <ul className="h-[8.5rem] flex flex-col justify-between">
                        <li className="text-sm text-[#9A9A9A]">Suporte ao Cliente</li>
                        <li className="text-sm text-[#9A9A9A]">Detalhes da entrega</li>
                        <li className="text-sm text-[#9A9A9A]">Termos e Condições</li>
                        <li className="text-sm text-[#9A9A9A]">Política de Privacidade</li>
                    </ul>
                </dd>
                <dd>
                    <h2 className="text-16 font-bold mb-6">Perguntas Frequentes</h2>
                    <ul className="h-[8.5rem] flex flex-col justify-between">
                        <li className="text-sm text-[#9A9A9A]">Gerenciar Entregas</li>
                        <li className="text-sm text-[#9A9A9A]">Pedidas</li>
                        <li className="text-sm text-[#9A9A9A]">Pagamentos</li>
                    </ul>
                </dd>
            </ul>
            <div className="py-7">
                <Divider />
            </div>
            <div className="flex justify-between mx-[100px]">
                <p>FoodMaster © 2015-2024, All Rights Reserved</p>
                <ul className="w-72 flex justify-between">
                    <li className="w-[46px] h-[30px] bg-white rounded-md flex justify-center items-center">
                        <Image src={Visa} alt="Visa" width={32} height={10} />
                    </li>
                    <li className="w-[46px] h-[30px] bg-white rounded-md flex justify-center items-center">
                        <Image src={MasterCard} alt="MasterCard" width={25} height={15} />
                    </li>
                    <li className="w-[46px] h-[30px] bg-white rounded-md flex justify-center items-center">
                        <Image src={Paypal} alt="Paypal" width={35} height={9} />
                    </li>
                    <li className="w-[46px] h-[30px] bg-white rounded-md flex justify-center items-center">
                        <Image src={Apay} alt="Apple Pay" width={26} height={11} />
                    </li>
                    <li className="w-[46px] h-[30px] bg-white rounded-md flex justify-center items-center">
                        <Image src={Gpay} alt="Google Pay" width={28} height={11} />
                    </li>
                </ul>
            </div>
        </div>
    )
}
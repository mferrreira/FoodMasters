'use client';
import { RiDeleteBinFill } from 'react-icons/ri';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { useCart } from '@/context/CartContext'; // Importando o contexto do carrinho

export default function CartProducts({ item }) { // Recebendo o item como prop
    const { removeFromCart, updateQuantity } = useCart(); // Usando o contexto

    return (
        <div className="flex gap-4 w-[667px] h-[124px]">

            <div className="h-32 w-32 bg-gray-200 rounded-lg">
                <img src={item.imageUrl} alt={item.nome} className="h-full w-full object-cover" />
            </div>

            <div className="flex-1 flex justify-between">
                <div>
                    <h2 className="text-xl mb-1">{item.nome}</h2>
                    <p className="text-sm mb-1">Código: <span className="text-gray-600">{item.codigo_barras}</span></p>
                    <p className="text-2xl font-bold mt-2">R${item.preco.toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-center">
                    <RiDeleteBinFill
                        className="text-red-600 text-lg mb-2 cursor-pointer"
                        onClick={() => removeFromCart(item.codigo_barras)}
                    />
                    <div className="w-32 h-10 flex justify-center items-center bg-gray-200 rounded-full gap-3 mt-auto">
                        <IoAddOutline
                            className="text-lg cursor-pointer"
                            onClick={() => updateQuantity(item.codigo_barras, item.quantidade + 1)}
                        />
                        <p>{item.quantidade}</p>
                        <IoRemoveOutline
                            className="text-lg cursor-pointer"
                            onClick={() => updateQuantity(item.codigo_barras, item.quantidade - 1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { RiDeleteBinFill } from 'react-icons/ri';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

export default function CartProducts() {

    return (
        <div className="flex gap-4 w-[667px] h-[124px]">
            <div className="h-32 w-32 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 flex justify-between">
                <div>
                    <h2 className="text-xl mb-1">Arroz</h2>
                    <p className="text-sm mb-1">Size: <span className="text-gray-600"></span></p>
                    <p className="text-sm mb-1">Color: <span className="text-gray-600"></span></p>
                    <p className="text-2xl font-bold mt-2">$120</p>
                </div>
                <div className="flex flex-col items-center">
                    <RiDeleteBinFill
                        className="text-red-600 text-lg mb-2 cursor-pointer"
                    />
                    <div className="w-32 h-10 flex justify-center items-center bg-gray-200 rounded-full gap-3 mt-auto">
                        <IoAddOutline
                            className="text-lg cursor-pointer"
                        />
                        <p>1</p>
                        <IoRemoveOutline
                            className="text-lg cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

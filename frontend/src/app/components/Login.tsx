"use client"

import { useUser } from "@/context/UserContext";
import api from "@/services/api";
import { useState } from "react";

export default function Login() {
    const { login } = useUser();
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const data = e.currentTarget;
            const formData = new FormData(data);
            
            await login(formData.get('email'), formData.get('senha'));
           
            // window.location.reload();
        } catch(e) {
            alert("Ocorreu um erro, tente novamente!");
            setError("Ocorreu um erro aqui");
        }

    }

    return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input 
            type="email" 
            name="email" 
            placeholder="Digite o seu email" 
            className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            required 
        />
        <input 
            type="password" 
            name="senha" 
            placeholder="Digite a sua senha" 
            className="border border-gray-300 rounded-md p-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            required 
        />
        <button 
            type="submit" 
            className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
            Entrar
        </button>
    </form>
</div>

    );}
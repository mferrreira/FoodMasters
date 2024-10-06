"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface User {
  user: {
    cpf_cnpj: string;
    rg: string;
    nome_completo: string;
    data_nascimento: Date;
    email: string;
    endereco: string;
    telefone: string;
    data_admissao: Date;
    salario: number;
    status: string;
    setor: string;
    is_vendedor: boolean;
  } | null;
  token: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser Deve ser usado dentro de um UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Checar se há token salvo localmente quando o app é carregado
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post('/login', { email, senha });
      const userData = response.data;
      
      // Armazenar o token e os dados do usuário no estado e localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Erro durante o login:', error);
      throw error; // Deixa o componente lidando com o erro
    }
  };

  // Função de logout que remove os dados do usuário
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos para os itens do carrinho
interface CartItem {
  codigo_barras: number;
  nome: string;
  quantidade: number;
  preco: number;
  subtotal: number;
  vendedor_id: number;
  status?: 'pendente' | 'confirmado'; // Status de cada item
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'subtotal'>) => void;
  removeFromCart: (codigo_barras: number) => void;
  updateQuantity: (codigo_barras: number, quantidade: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Carregar carrinho do localStorage ao inicializar
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [total, setTotal] = useState(0);

  // Atualizar total do carrinho e salvar no localStorage
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(newTotal);
    
    // Atualizar localStorage sempre que o carrinho mudar
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Adicionar item ao carrinho
  const addToCart = (item: Omit<CartItem, 'subtotal'>) => {
    const existingItem = cart.find(cartItem => cartItem.codigo_barras === item.codigo_barras);
    
    if (existingItem) {
      // Atualiza a quantidade e subtotal se o produto já estiver no carrinho
      setCart(prevCart =>
        prevCart.map(cartItem =>
          cartItem.codigo_barras === item.codigo_barras
            ? {
                ...cartItem,
                quantidade: cartItem.quantidade + item.quantidade,
                subtotal: (cartItem.quantidade + item.quantidade) * cartItem.preco
              }
            : cartItem
        )
      );
    } else {
      // Adiciona novo item ao carrinho
      setCart(prevCart => [...prevCart, { ...item, subtotal: item.quantidade * item.preco }]);
    }
  };

  // Remover item do carrinho
  function removeFromCart(codigo_barras: number) {
    setCart(prevCart => prevCart.filter(item => item.codigo_barras !== codigo_barras));
  };

  // Atualizar quantidade de um item no carrinho
  function updateQuantity(codigo_barras: number, quantidade: number) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.codigo_barras === codigo_barras ? { ...item, quantidade, subtotal: quantidade * item.preco } : item
      )
    );
  };

  // Limpar o carrinho
  function clearCart() {
    setCart([]);
    localStorage.removeItem('cart'); // Limpa o localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

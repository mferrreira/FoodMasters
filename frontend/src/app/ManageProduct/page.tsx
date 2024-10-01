'use client';
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoEye, IoAdd } from "react-icons/io5";
import api from "../../services/api";
import { AxiosResponse } from "axios";
import Link from "next/link";

// Definindo a interface para um produto
interface Product {
  codigo_barras: string;
  nome: string;
  descricao?: string;
  categoriaId?: number;
  preco: number;
  estoque: number;
  marca?: string;
  data_fabricacao?: string; 
  data_validade?: string; 
  imagem_url?: string;
  status: string;
  fornecedor?: string;
  gerenteUsuarioId?: string;
}

// Simulação de produtos de exemplo
const exemploProdutos: Product[] = [
  {
    codigo_barras: "123456789012",
    nome: "Produto A",
    descricao: "Descrição do Produto A",
    preco: 100.0,
    estoque: 50,
    status: "Ativo",
  },
  {
    codigo_barras: "987654321098",
    nome: "Produto B",
    descricao: "Descrição do Produto B",
    preco: 200.0,
    estoque: 20,
    status: "Ativo",
  },
  {
    codigo_barras: "543210987654",
    nome: "Produto C",
    descricao: "Descrição do Produto C",
    preco: 150.0,
    estoque: 10,
    status: "Inativo",
  },
];

// Atualizando a função getProducts para simular a resposta do servidor
async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(exemploProdutos); // Retorna os produtos de exemplo após uma simulação de requisição
    }, 1000);
  });
}

// Exemplo de uso da interface Product no componente
export default function ManageProduct() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = (codigo_barras: string) => {
    setProducts(products.filter(product => product.codigo_barras !== codigo_barras));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white rounded-md p-6 mx-24">
      <h2 className="text-2xl font-bold mb-4">Gerenciamento de Produtos</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Buscar produto..."
          className="border border-gray-300 rounded-md py-2 px-3 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="./RegistrationProduct">
          <button className="bg-black text-white py-2 px-4 rounded-md flex items-center">
            <IoAdd className="mr-2" /> Adicionar Produto
          </button>
        </Link>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4 text-left">Nome</th>
            <th className="border-b p-4 text-left">Código de Barras</th>
            <th className="border-b p-4 text-left">Quantidade em Estoque</th>
            <th className="border-b p-4 text-left">Preço</th>
            <th className="border-b p-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.codigo_barras} className="hover:bg-gray-100">
              <td className="border-b p-4">{product.nome}</td>
              <td className="border-b p-4">{product.codigo_barras}</td>
              <td className="border-b p-4">{product.estoque}</td>
              <td className="border-b p-4">{product.preco.toFixed(2)} R$</td>
              <td className="border-b p-4 flex space-x-2">
                <Link href="./EditProduct/">
                  <button className="text-blue-500">
                    <FiEdit />
                  </button>
                </Link>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(product.codigo_barras)}
                >
                  <FiTrash />
                </button>
                <Link href="./ProductInformation">
                  <button className="text-blue-500">
                    <IoEye />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
          Próxima
        </button>
      </div>
    </div>
  );
}

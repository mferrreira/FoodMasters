'use client';
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoEye, IoAdd } from "react-icons/io5";
import api from "../../services/api";
import Link from "next/link";

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

export default function ManageProduct() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  const [products, setProducts] = useState<Product[]>([]);

  // Função para buscar produtos da API
  const getProducts = async () => {
    try {
      const response = await api.get("/api/produtos");
      console.log(response)
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filtrar produtos com base no termo de busca
  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Função para deletar um produto
  const handleDelete = async (codigo_barras: string) => {
    if (confirm("Você tem certeza que deseja excluir este produto?")) {
        try {
            await api.delete(`/api/produtos/${codigo_barras}`);
            setProducts(products.filter(product => product.codigo_barras !== codigo_barras));
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);
        }
    }
};

  // Paginação
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
              <td className="border-b p-4"> R${product.preco}</td>
              <td className="border-b p-4 flex space-x-2">
                <Link href={`./EditProduct/?id=${product.codigo_barras}`}>
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
                <Link href={`./ProductInformation/?id=${product.codigo_barras}`}>
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

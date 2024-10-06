"use client";

import api from '../../services/api';

export default function RegistrationProduct() {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        console.log(data);

        if(!data.data_validade)
            return alert("Insira a data de validade e de fabricação");
        

        console.log(data);

        try {
            const res = await api.post("/api/produtos/", data); // Passando os dados do formulário
            
            if(res)
                alert("Produto cadastrado com sucesso!")
            
            console.log("Produto cadastrado!", res.data);
        } catch (e) {
            console.error("Deu erro aqui: ", e);
        }
    }

    return (
        <div className="mx-24 my-6 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-6">Cadastro de Produto</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Nome do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input
                        type="text"
                        name="nome"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o nome do produto"
                    />
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        name="descricao"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a descrição do produto"
                    />
                </div>

                {/* Categoria */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" name="categoriaId">
                        <option value="">Escolha uma categoria</option>
                        <option value="1">Categoria 1</option>
                        <option value="2">Categoria 2</option>
                    </select>
                </div>

                {/* Preço */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preço</label>
                    <input
                        name="preco"
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o preço do produto"
                    />
                </div>

                {/* Quantidade em Estoque */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
                    <input
                        name="estoque"
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a quantidade em estoque"
                    />
                </div>

                {/* Código de Barras */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Código de Barras</label>
                    <input
                        name="codigo_barras"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o código de barras"
                    />
                </div>

                {/* Marca */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <input
                        name="marca"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a marca"
                    />
                </div>

                {/* Data de Fabricação */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Fabricação</label>
                    <input
                        name="data_fabricacao"
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Data de Validade */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
                    <input
                        name="data_validade"
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Imagem do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Imagem</label>
                    <input
                        name="imagem_url"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a URL da imagem"
                    />
                </div>

                {/* Status do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status do Produto</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" name="status">
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>

                {/* Fornecedor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fornecedor</label>
                    <input
                        name="fornecedor"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o nome do fornecedor"
                    />
                </div>

                {/* Botão de Submit */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-slate-600"
                    >
                        Cadastrar Produto
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function EditProduct() {
    return (
        <div className=" mx-24 my-6 bg-white  rounded-md">
            <h2 className="text-2xl font-bold mb-6">Alterar informações do Produto</h2>
            <form className="space-y-4">
                {/* Nome do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o nome do produto"
                    />
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a descrição do produto"
                    />
                </div>

                {/* Categoria */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                        <option>Escolha uma categoria</option>
                        <option>Categoria 1</option>
                        <option>Categoria 2</option>
                    </select>
                </div>

                {/* Subcategoria */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subcategoria</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                        <option>Escolha uma subcategoria</option>
                        <option>Subcategoria 1</option>
                        <option>Subcategoria 2</option>
                    </select>
                </div>

                {/* Preço */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preço</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o preço do produto"
                    />
                </div>

                {/* Quantidade em Estoque */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a quantidade em estoque"
                    />
                </div>

                {/* Código de Barras */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Código de Barras</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o código de barras"
                    />
                </div>

                {/* Marca */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a marca"
                    />
                </div>

                {/* Data de Fabricação */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Fabricação</label>
                    <input
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Data de Validade */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
                    <input
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Imagem do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Imagem</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite a URL da imagem"
                    />
                </div>

                {/* Status do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status do Produto</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                </div>

                {/* Fornecedor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fornecedor</label>
                    <input
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

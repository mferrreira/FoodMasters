export default function EditSeller() {
    return (
        <div className="mx-24 my-6 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-6">Alterar informações do Vendedor</h2>
            <form className="space-y-4">
                {/* Nome Completo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o nome completo"
                    />
                </div>

                {/* CPF */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o CPF"
                    />
                </div>

                {/* RG */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">RG</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o RG"
                    />
                </div>

                {/* Data de Nascimento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <input
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Endereço */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Endereço</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o endereço"
                    />
                </div>

                {/* Telefone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        type="tel"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o telefone"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o email"
                    />
                </div>

                {/* Data de Admissão */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Admissão</label>
                    <input
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                {/* Salário */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Salário</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o salário"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                </div>

                {/* Setor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Setor</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        placeholder="Digite o setor"
                    />
                </div>

                {/* Botão de Submit */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-slate-600"
                    >
                        Cadastrar Vendedor
                    </button>
                </div>
            </form>
        </div>
    );
}

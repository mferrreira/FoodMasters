"use client"

import api from "../../services/api";

export default function SellerForm() {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData  = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        console.log(data);

        try {
            const res = await api.post("/api/users/gerente/vendedores", data);
            console.log("Produo cadastrado!", res.data);
            alert(res.data.message)
        } catch(e) {
            console.log("Deu erro aqui: ", e);
        }
    }

    return (
      <div className="mx-24 my-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold mb-6">Cadastro de Vendedor</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Nome Completo */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      name="nome_completo"
                      placeholder="Digite o nome completo"
                  />
              </div>

              {/* CPF */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">CPF</label>
                  <input
                      name="cpf_cnpj"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      placeholder="Digite o CPF"
                  />
              </div>

              {/* RG */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">RG</label>
                  <input
                        name="rg"
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
                      name="data_nascimento"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
              </div>

              {/* Endereço */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Endereço</label>
                  <input
                  name="endereco"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      placeholder="Digite o endereço"
                  />
              </div>

              {/* Telefone */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                        name="telefone"
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      placeholder="Digite o telefone"
                  />
              </div>

              {/* Email */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      placeholder="Digite o email"
                  />
              </div>

            {/* CPF */}
             <div>
                  <label className="block text-sm font-medium text-gray-700">Senha</label>
                  <input
                      name="senha"
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      placeholder="Digite a senha do vendedor"
                  />
              </div>

              {/* Data de Admissão */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Admissão</label>
                  <input
                  name="data_admissao"
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
              </div>

              {/* Salário */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Salário</label>
                  <input
                    name="salario"
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      placeholder="Digite o salário"
                  />
              </div>

              {/* Status */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" name="status">
                      <option>Ativo</option>
                      <option>Inativo</option>
                  </select>
              </div>

              {/* Setor */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Setor</label>
                  <input
                    name="setor"
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

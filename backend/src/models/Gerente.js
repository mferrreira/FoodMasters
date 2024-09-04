const Usuario = require('./Usuario')
const Produto = require('./Produto');

class Gerente extends Usuario{

    constructor(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor) {
        super(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor);
    }

    // CRUD Produtos (validar e chamar os métodos da classe Produto)

    // CRUD Vendedores

    // Acesso a vendas

    // Acesso a relatórios e análises de vendedores
}

module.exports = Gerente;
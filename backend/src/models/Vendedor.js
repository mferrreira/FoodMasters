const Usuario = require('./Usuario')

class Vendedor extends Usuario{

    constructor(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor) {
        super(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor);
    }

    // Realizar venda

    // visualizar venda

    // consultar produtos

    // gerar recibo
}

module.exports = Vendedor
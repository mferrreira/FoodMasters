const { stdin, stdout} = require('process');
const Gerente = require('../models/Gerente');

const readline = require('readline').createInterface({
    input: stdin,
    output: stdout,
});

function input(msg) {
    return new Promise((resolve) => {
        readline.question(msg, (answer) => {
            resolve(answer);
        });
    });
}


async function main() {
    console.log("ADICIONAR NOVO GERENTE: \n\n");

    const nomeCompleto = await input("Digite o nome do novo gerente: ");
    const cpf = await input("Digite o CPF do novo gerente: ");
    const email = await input("Digite o email do novo gerente: ");
    const senha = await input("Digite a senha do novo gerente: ");


    try {
        const novoGerente = new Gerente(cpf);
        novoGerente.nomeCompleto = nomeCompleto;
        novoGerente.email = email;
        novoGerente.senha = senha;
        await novoGerente.save(false);
    } catch(e) {
        console.log("Ocorreu um erro: \n", e);
    }

    console.log("Gerente Adicionado!");

    return

}

main()
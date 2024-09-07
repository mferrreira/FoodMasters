const prisma = require('../services/prismaClient');

const bcrypt = require('bcryptjs');

class Usuario {

    constructor(cpf, rg, nomeCompleto, dataNascimento, email, senha, endereco, telefone, dataAdmissao, salario, status, setor) {
        this.cpf = cpf;
        this.rg = rg;
        this.nomeCompleto = nomeCompleto;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
        this.telefone = telefone;
        this.dataAdmissao = dataAdmissao;
        this.salario = salario;
        this.status = status;
        this.setor = setor;
    }

    async save() {
        try {
            const hashedPassword = bcrypt.hash(this.senha, 10);
            const newUser = await prisma.usuario.create({
                data: {
                    cpf_cnpj: this.cpf,
                    rg: this.rg,
                    nome_completo: this.nomeCompleto,
                    data_nascimento: this.dataNascimento,
                    email: this.email,
                    senha: hashedPassword,
                    endereco: this.endereco,
                    telefone: this.telefone,
                    data_admissao: this.dataAdmissao,
                    salario: this.salario,
                    status: this.status,
                    setor: this.setor
                }
            });
            return newUser;
        } catch(e) {
            throw new Error('Erro ao criar usuário: ' + e.message);
        }
    }

    static async findByCpf(id) {
        try {
            const user = await prisma.usuario.findUnique({ where: {id: id}});
            return user
        } catch (e) {
            throw new Error('Erro ao buscar usuário' + e.message);
        }
    }

    async update() {
        try {
            const updatedUser = await prisma.usuario.update({
                where: {cpf_cnpj: this.cpf},
                data: {
                    cpf_cnpj: this.cpf_cnpj,
                    rg: this.rg,
                    nome_completo: this.nome_completo,
                    data_nascimento: this.data_nascimento,
                    email: this.email,
                    senha: this.senha,
                    endereco: this.endereco,
                    telefone: this.telefone,
                    data_admissao: this.data_admissao,
                    salario: this.salario,
                    status: this.status,
                    setor: this.setor
                }
            });
        } catch(e) {
            throw new Error('Não foi possível atualizar os dados do usuário\n' + e.message);
        }
    }

    static async delete(id) {
        try {
          await prisma.usuario.delete({
            where: { cpf_cnpj: this.cpf }
          });
        } catch (error) {
          throw new Error('Erro ao deletar usuário: ' + error.message);
        }
      }

    static async findAll() {
        try {
          const users = await prisma.usuario.findMany();
          return users;
        } catch (error) {
          throw new Error('Erro ao listar usuários: ' + error.message);
        }
      }
}

module.exports = Usuario;
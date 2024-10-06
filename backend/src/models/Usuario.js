const prisma = require('../services/prismaClient');
const bcrypt = require('bcryptjs');


class Usuario {

    constructor(cpf, nomeCompleto, email, senha,dataNascimento, rg, endereco, telefone, dataAdmissao, salario, status, setor) {
        this.cpf = cpf;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.rg = rg;
        this.dataNascimento = dataNascimento === undefined ? new Date().toISOString() : dataNascimento;
        this.endereco = endereco;
        this.telefone = telefone
        this.dataAdmissao = dataNascimento === undefined ? new Date().toISOString() :dataAdmissao;
        this.salario = salario === undefined ? 0 : parseFloat(salario),
        this.status = status;
        this.setor = setor;
    }

    async save(is_vendedor = true) {
        try {
            const hashedPassword = await bcrypt.hash(this.senha, 10);
            await prisma.usuario.create({
                data: {
                    cpf_cnpj: this.cpf,
                    rg: this.rg,
                    nome_completo: this.nomeCompleto,
                    data_nascimento: new Date(this.dataNascimento).toISOString(),
                    email: this.email,
                    senha: hashedPassword,
                    endereco: this.endereco,
                    telefone: this.telefone,
                    data_admissao: new Date(this.dataAdmissao).toISOString(),
                    salario: this.salario,
                    status: this.status,
                    setor: this.setor,
                    is_vendedor: is_vendedor,
                }
            });
            return true;
        } catch(e) {
            throw new Error('Erro ao criar usuário: ' + e);
        }
    }


    async update(cpf, updateData) {
        try {
            const updatedUser = await prisma.usuario.update({
                where: {cpf: cpf},
                data: {
                    cpf: cpf,
                    rg: updateData.rg,
                    nome_completo: updateData.nome_completo,
                    data_nascimento: updateData.data_nascimento,
                    email: updateData.email,
                    senha: updateData.senha,
                    endereco: updateData.endereco,
                    telefone: updateData.telefone,
                    data_admissao: updateData.data_admissao,
                    salario: updateData.salario,
                    status: updateData.status,
                    setor: updateData.setor,
                }
            });
            return updatedUser;
        } catch(e) {
            throw new Error('Não foi possível atualizar os dados do usuário\n' + e.message);
        }
    }

    static async delete(cpf) {
        try {
          await prisma.usuario.delete({
            where: { cpf: cpf }
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
const prisma = require('../services/prismaClient');

class Categoria {

    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    // Adicionar nova categoria
    async adicionarCategoria() {
        const novaCategoria = await prisma.categoria.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
            }
        });
        return novaCategoria;
    }

    // Atualizar categoria existente
    static async atualizarCategoria(id, novosDados) {
        const categoriaAtualizada = await prisma.categoria.update({
            where: { id: id },
            data: novosDados
        });
        return categoriaAtualizada;
    }

    // Remover categoria
    static async removerCategoria(id) {
        const categoriaRemovida = await prisma.categoria.delete({
            where: { id: id }
        });
        return categoriaRemovida;
    }

    // Listar todas as categorias
    static async listarCategorias() {
        const categorias = await prisma.categoria.findMany();
        return categorias;
    }

    // Obter uma categoria específica
    static async obterCategoria(id) {
        const categoria = await prisma.categoria.findUnique({
            where: { id: id }
        });
        return categoria;
    }
}

module.exports = Categoria;

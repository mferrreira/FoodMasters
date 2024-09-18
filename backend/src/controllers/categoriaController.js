const Categoria = require("../models/Categoria")

class CategoriaController {
    
    static async adicionarCategoria(req, res) {
        try{
            const { nome, descricao } = req.body;

            if (!nome || !descricao) 
                return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });

            const categoriaExiste = (await Categoria.listarCategorias()).map((c) => c.nome === nome[0]);
            
            if (categoriaExiste) 
                return res.status(400).json({ error: "Categoria já existe" });

            const novaCategoria = Categoria(nome, descricao);
            await novaCategoria.adicionarCategoria();
            
            return res.status(201).json(novaCategoria);
        } catch(e) {
            console.error("Erro ao criar categoria:", e);
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    };

    static async removerCategoria(req, res) {
        try{
            const { nome, id } = req.body;

            if (!nome || !id) 
                return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });

            const categoriaExiste = (await Categoria.listarCategorias()).map((c) => c.nome === nome[0]);
            if (!categoriaExiste) 
                return res.status(400).json({ error: "Categoria não existe" });

            const categoriaRemovida = await Categoria.removerCategoria(id);
            
            return res.status(201).json(categoriaRemovida);
        } catch(e) {
            console.error("Erro ao criar categoria:", e);
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    };
    
    static async atualizarCategoria(req, res) {
        try{
            const { nome, descricao, id } = req.body;

            if (!nome || !descricao) 
                return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });

            const categoriaExiste = (await Categoria.listarCategorias()).map((c) => c.nome === nome[0]);
            if (!categoriaExiste) 
                return res.status(400).json({ error: "Categoria não existe" });

            const categoriaAtualizada = await Categoria.atualizarCategoria(id, {nome: nome, descricao: descricao});
            
            return res.status(201).json(categoriaAtualizada);
        } catch(e) {
            console.error("Erro ao criar categoria:", e);
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    };
    
    static async listarCategorias(req, res) {
        try {
            const categorias = await Categoria.listarCategorias();
            return res.status(201).json(categorias);
        } catch(e) {
            console.error("Erro ao listar categorias: ", e);
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    };
    
    static async obterCategoria(req, res) {
        try {
            const {id, nome} = req.body;

            if (!id || !nome)
                return res.status(400).json({error: "Campos obrigatório não preenchidos"});

            const categoria = await Categoria.obterCategoria(id);

            if (!categoria)
                return res.status(404).json({error: "Categoria não encontrada"});

            return res.status(201).json(categoria);
        } catch(e) {
            console.error("Erro ao obter categoria:", e);
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    };

}
const Produto_Interno = require('../models/ProdutoInterno.js');
const Sequelize = require('sequelize');
const Produto_Interno = require('../models/ProdutoInterno.js');
const Produto_Interno = require('../models/ProdutoInterno.js');
const Produto_Interno = require('../models/ProdutoInterno.js');

module.exports = class ProdutoInternoController {
    // Listar todos os produtos
    static async listAll(req, res) {
        try {
            const produtos = await Produto_Interno.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const Produto_Interno = await Produto_Interno.findByPk(id);
            if (Produto_Interno) {
                res.status(200).json(Produto_Interno);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const Produto_Interno = await Produto_Interno.findByPk(id);
            if (Produto_Interno) {
                await Produto_Interno.destroy();
                res.status(204).json({ message: 'Produto apagado com sucesso!' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        try {
            const Produto_Interno = await Produto_Interno.findByPk(id);
            if (Produto_Interno) {
                const { name, preco, estoqueMinimo } = req.body;
                Produto_Interno.name = name;
                Produto_Interno.preco = preco;
                Produto_Interno.estoqueMinimo = estoqueMinimo;
                await Produto_Interno.save();
                res.status(200).json(Produto_Interno);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async create(req, res) {
        const { name, preco, estoqueMinimo } = req.body;
        try {
            const newProdutoInterno = await Produto_Interno.create({ name, preco, estoqueMinimo });
            res.status(201).json(newProdutoInterno);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }
}
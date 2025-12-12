const express = require('express');
const router = express.Router();
const ProdutoInternoController = require('../controllers/ProdutoInternoController.js');

router.get('/produtos', ProdutoInternoController.listAll);
router.get('/produtos/:id', ProdutoInternoController.getById);
router.post('/produtos', ProdutoInternoController.create);
router.put('/produtos/:id', ProdutoInternoController.update);
router.delete('/produtos/:id', ProdutoInternoController.delete);

module.exports = router;
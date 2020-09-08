const express = require('express');
const transactionRouter = express.Router();
const {
  findAll,
  create,
  update,
  remove,
} = require('../services/transactionService');

transactionRouter.get('/retieve/:period', findAll);
transactionRouter.post('/createTrans', create);
transactionRouter.patch('/updateTrans/:id', update);
transactionRouter.delete('/deleteTrans/:id', remove);

transactionRouter.get('/teste', (_, response) => {
  response.send({
    message: 'Acesso a rota /api/transaction/teste',
  });
});

module.exports = transactionRouter;

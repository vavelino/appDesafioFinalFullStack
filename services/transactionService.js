const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    //res.send(transaction);
    res.send({ message: 'Grade inserido com sucesso' });

    //logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    //logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const { period } = req.params;
  try {
    const transaction = await TransactionModel.find({ yearMonth: period }).sort({day:1});
    res.send(transaction);
    //logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.send(transaction);
    // logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    // logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  //console.log(id);

  try {
    //logger.info(`DELETE /grade - ${id}`);
   // const transaction = TransactionModel.findByIdAndDelete({ _id: id });
	// const transaction = TransactionModel.findByIdAndDelete({ _id: id  });
	 
    const transaction = TransactionModel.findByIdAndDelete(id, function (err, docs) { 
      if (err){ 
          console.log(err) 
      }
       
      }); 
    if (!transaction) {
      res.status(404).send('Documento não encontrado na coleção');
    } else {
      res.send('OK');
	  console.log(transaction);
	  //es.send(transaction);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};
module.exports = { create, findAll, update, remove };

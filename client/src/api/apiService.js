import axios from 'axios';

const API_URL_Retieve = 'http://localhost:3001/api/transaction/retieve/';
const API_URL_Delete = 'http://localhost:3001/api/transaction/deleteTrans/';
const API_URL_Uptade = 'http://localhost:3001/api/transaction/updateTrans/';
const API_URL_Create = 'http://localhost:3001/api/transaction/createTrans';

async function getAllTransaction(period) {
  try {
    return await axios.get(API_URL_Retieve + period);
  } catch (e) {
    console.log(e);
  }
}
async function deleteTransaction(period) {
  // console.log(period);
  try {
    await axios.delete(API_URL_Delete + period);
    // console.log(resp);
  } catch (e) {
    console.log(e);
  }
}
async function uptadeTransaction(period, body) {
  try {
    return await axios.patch(API_URL_Uptade + period, body);
  } catch (e) {
    console.log(e);
  }
}
async function createTransaction(body) {
  try {
    return await axios.post(API_URL_Create, body);
  } catch (e) {
    console.log(e);
  }
}

export {
  getAllTransaction,
  deleteTransaction,
  uptadeTransaction,
  createTransaction,
};

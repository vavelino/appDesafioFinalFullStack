import React, { useState, useEffect } from 'react';
import { formatNumber } from './helpers/formatHelpers';
// import Modal from 'react-modal';
// import ReactDOM from 'react-dom';

import {
  SelectMonth,
  monthsEqualDB,
} from './components/Selecionar/SelectMonth';

import Output from './components/output/Output';
import Filtro from './components/filtro/Filtro';
import Transactions from './components/transaction/Transactions';
import {
  getAllTransaction,
  deleteTransaction,
  uptadeTransaction,
  createTransaction,
} from './api/apiService';
import ModalTransaction from './components/modalTransaction/ModalTransaction';

//import ModalTransaction from './components/modalTransaction/ModalTransaction';

let transactionPeriod; // FULL JSON PERIOD
let dataCurrent;
export default function Component() {
  const [amount, setAmount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactionsCurrent, setTransactionsCurrent] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // Nota selecionada para ser persistida
  // const [selectedGrade, setSelectedGrade] = useState({});
  const [selectedTransaction, setSelectedTransaction] = useState({});

  // Indicador de modal visível/invisível
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);
  /**
   * Efetua a persistência dos dados propriamente dita
   */
  const handleUpdateDataCreate = (data) => {
    const { date, description, value, category, type } = data;
    //console.log(data);
    const aux = date;
    const Aux = aux.split('-');
    const day = Aux[2];
    const month = Aux[1];
    const year = Aux[0];
    createTransaction({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: `${year}-${month}`,
      yearMonthDay: `${year}-${month}-${day}`,
      type,
    });
    setIsModalCreate(false);
    handlechangeMonth(dataCurrent);
    //console.log('day' + day + 'month' + month + 'year' + year);
  };

  /*const handleCreateData = async (data) => {
    
    const { day, month, year, description, value, category, type } = data;
    createTransaction({
      description,
      value,
      category,
      yearMonth: `${year}-${month}`,
      yearMonthDay: `${year}-${month}-${day}`,
      day: day,
      month: month,
      year: year,
      type,
    });
  };*/

  const handleUpdateData = async (data) => {
    const { category, date, description, id, value } = data;

    console.log(data);
    let aux = date;
    let Aux = aux.split('-');
    console.log(Aux[0]);
    const day = Aux[2];
    const month = Aux[1];
    const year = Aux[0];

    uptadeTransaction(id, {
      category,
      description,
      value,
      yearMonth: `${year}-${month}`,
      yearMonthDay: `${year}-${month}-${day}`,
      day: day,
      month: month,
      year: year,
    });
    setIsModalOpen(false);
    handlechangeMonth(dataCurrent);
  };
  const handleOpenCreate = () => {
    setIsModalCreate(true);
  };
  const handleCloseCreate = () => {
    setIsModalCreate(false);
  };
  const handleEditButton = async (id) => {
    //console.log(id);
    //console.log(transactionPeriod.data);
    let transactionSelected = transactionPeriod.data.filter((transaction) => {
      return transaction._id.indexOf(id) >= 0;
    });
    //console.log(transactionSelected);

    setSelectedTransaction(transactionSelected[0]);
    setIsModalOpen(true);
    //setSelectedTransaction = {};
  };
  const handleDeleteButton = async (id) => {
    deleteTransaction(id);
    console.log('Excluido com sucesso');
    handlechangeMonth(dataCurrent);

    // console.log(deleteTransaction(id));
    // console.log(id);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    let revenueValue = transactionsCurrent.reduce(
      (acumulador, valorAtual, index, array) => {
        if (valorAtual.type === '+') {
          acumulador = acumulador + valorAtual.value;
        }
        return acumulador;
      },
      0
    );
    let expenseValue = transactionsCurrent.reduce((acumulador, valorAtual) => {
      if (valorAtual.type === '-') {
        acumulador = acumulador + valorAtual.value;
      }
      return acumulador;
    }, 0);
    setAmount(transactionsCurrent.length);
    setRevenue(revenueValue);
    setExpense(expenseValue);
    setBalance(revenueValue - expenseValue);
  }, [transactionsCurrent]);

  async function handlechangeMonth(valueMonth) {
    dataCurrent = valueMonth;
    const period = monthsEqualDB[valueMonth];
    transactionPeriod = await getAllTransaction(period);
    setTransactionsCurrent(transactionPeriod.data);
  }
  async function handlechangeFilter(valueFilter) {
    setFilterInput(valueFilter);

    function transactionsFiltered(fullJson, filterName) {
      let filterJson;
      filterJson = fullJson.filter((transaction) => {
        return (
          transaction.description
            .toLowerCase()
            .indexOf(filterName.toLowerCase()) >= 0
        );
      });
      return filterJson;
    }
    setTransactionsCurrent(
      transactionsFiltered(transactionPeriod.data, valueFilter)
    );
  }
  // function openModal() {
  //   setIsModalOpen(true);
  // }

  // function closeModal() {
  //   setIsModalOpen(false);
  // }
  // function afterOpenModal() {
  //   console.log('aeae');
  // }

  return (
    <div
      //   className="
      // content"
      className={isModalOpen || isModalCreate ? 'invisivel content' : 'content'}
    >
      {/* <div> */}
      {/* <div className={isModalOpen ? 'invisivel' : ''}> */}
      <div>
        <h1 className="center">Bootcamp Full Stack - Desafio Final</h1>
        <h3 className="center">Controle Financeiro Pessoal</h3>
        <br />
        <SelectMonth className="center" changeMonth={handlechangeMonth} />
        <hr />
        <div className="outputs">
          <Output
            name="Lançamentos: "
            colourName="black"
            colourValue="black"
            Value={amount}
          />
          <Output
            name="Receita: "
            colourName="black"
            colourValue="#16a085"
            Value={formatNumber(revenue)}
          />
          <Output
            name="Despesas: "
            colourName="black"
            colourValue="#c0392b"
            Value={formatNumber(-expense)}
          />
          <Output
            name="Saldo: "
            colourName="black"
            colourValue="#16a085"
            Value={formatNumber(balance)}
          />
        </div>
        <hr />
        <Filtro
          clickButton={handleOpenCreate}
          valueFilter={filterInput}
          changeFilter={handlechangeFilter}
        />
        <hr />
        <div className="transactions">
          {transactionsCurrent.map(
            ({ day, category, description, value, _id, type }) => {
              return (
                <Transactions
                  key={_id}
                  id={_id}
                  day={day}
                  category={category}
                  description={description}
                  valuePrice={formatNumber(value)}
                  type={type}
                  editButton={handleEditButton}
                  deleteButton={handleDeleteButton}
                />
              );
            }
          )}
        </div>
      </div>
      <ModalTransaction
        onUpdate={handleUpdateData}
        onClose={handleClose}
        isModalOpen={isModalOpen}
        selectedTransaction={selectedTransaction}
        changeSign={false}
        title="Edição de lançamento"
      />
      <ModalTransaction
        onUpdate={handleUpdateDataCreate}
        onClose={handleCloseCreate}
        isModalOpen={isModalCreate}
        selectedTransaction={{
          description: '',
          value: '',
          category: '',
          year: '',
          month: '',
          day: '',
          yearMonth: '',
          yearMonthDay: '',
          type: '',
          _id: '',
        }}
        changeSign={true}
        title="Inclusão de lançamento"
      />
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
      >
        <h2></h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
      </Modal> */}
    </div>
  );
}

// #16a085,
//"#c0392b
// ##4cb48a
//#38a4f7
//#f44391
//#ff5787

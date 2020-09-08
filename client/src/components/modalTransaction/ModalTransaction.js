//import React from 'react';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

/**
 * Exigido pelo componente Modal
 */
Modal.setAppElement('#root');

/**
 * Componente ModalGrade
 */
export default function ModalTransaction({
  changeSign,
  onUpdate,
  onClose,
  selectedTransaction,
  isModalOpen,
  title,
}) {
  // console.log(selectedTransaction._id);
  const handleModalClose = () => {
    onClose(null);
  };

  function handleAddrTypeChange(e) {
    //console.log(e.target.value);
    setIndexSelect(e.target.value);
  }
  function handleSaveChanges(e) {
    onUpdate({
      id: selectedTransaction._id,
      category: categoryValue,
      description: descriptionValue,
      value: valueValue,
      date: dateValue,
      type: indexSelect === 0 ? '-' : '+',
    });
  }
  function handleChangeDescription(e) {
    setDescriptionValue(e.target.value);
    // console.log(e.target.value);
  }
  function handleChangeCategory(e) {
    setCategoryValue(e.target.value);
    // console.log(e.target.value);
  }
  function handleChangeValue(e) {
    setValueValue(e.target.value);
    //  console.log(e.target.value);
  }
  function handleChangeDate(e) {
    setDateValue(e.target.value);
    //  console.log(e.target.value);
  }
  useEffect(() => {
    setCategoryValue(selectedTransaction.category);
    setDescriptionValue(selectedTransaction.description);
    setValueValue(selectedTransaction.value);
    setDateValue(selectedTransaction.yearMonthDay);
  }, [selectedTransaction]);

  const [categoryValue, setCategoryValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [valueValue, setValueValue] = useState('');
  const [dateValue, setDateValue] = useState('2017-06-01');
  const [indexSelect, setIndexSelect] = useState(0);
  return (
    <div>
      <Modal className="Modal" isOpen={isModalOpen}>
        <div style={styles.flexRow}>
          <span style={styles.title}>{title}</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <div className={changeSign ? '' : 'invisivel'}>
          <select
            onChange={(e) => handleAddrTypeChange(e)}
            className="browser-default custom-select negrito "
            value={indexSelect}
          >
            <option key={0} value={0}>
              Despesa
            </option>
            <option key={1} value={1}>
              Receita
            </option>
          </select>
        </div>
        <div>
          <label>Descrição:</label>
          <input value={descriptionValue} onChange={handleChangeDescription} />
        </div>
        <div>
          <label>Categoria:</label>
          <input value={categoryValue} onChange={handleChangeCategory} />
        </div>
        <div className="ModalValueDate">
          <div className="ModalValue">
            <label>Valor:</label>
            <input value={valueValue} onChange={handleChangeValue} />
          </div>
          <div className="ModalDate">
            <input
              type="date"
              value={dateValue}
              onChange={handleChangeDate}
            ></input>
          </div>
        </div>

        <div style={styles.flexRow}>
          <div className="ModalButton">
            <button
              onClick={handleSaveChanges}
              className="waves-effect waves-light btn"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};

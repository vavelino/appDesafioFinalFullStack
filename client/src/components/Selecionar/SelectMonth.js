import React from 'react';
import { useState, useEffect } from 'react';
//import { getAllTransaction } from '../../api/apiService';
const maior = '>';
const menor = '<';
const months = [
  'Selecione o Período',
  'jan/19',
  'fev/19',
  'mar/19',
  'abr/19',
  'mai/19',
  'jun/19',
  'jul/19',
  'ago/19',
  'set/19',
  'out/19',
  'nov/19',
  'dez/19',
  'jan/20',
  'fev/20',
  'mar/20',
  'abr/20',
  'mai/20',
  'jun/20',
  'jul/20',
  'ago/20',
  'set/20',
  'out/20',
  'nov/20',
  'dez/20',
  'jan/21',
  'fev/21',
  'mar/21',
  'abr/21',
  'mai/21',
  'jun/21',
  'jul/21',
  'ago/21',
  'set/21',
  'out/21',
  'nov/21',
  'dez/21',
];
const monthsEqualDB = [
  '0',
  '2019-01',
  '2019-02',
  '2019-03',
  '2019-04',
  '2019-05',
  '2019-06',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-10',
  '2019-11',
  '2019-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
];

function SelectMonth({ changeMonth }) {
  const [indexSelect, setindexSelect] = useState(0);
  const [enableButtonRight, setEnableButtonRight] = useState(false);
  const [enableButtonLeft, setEnableButtonLeft] = useState(false);

  useEffect(() => {
    if (parseInt(indexSelect) + 1 < months.length) {
      setEnableButtonRight(false);
    } else {
      setEnableButtonRight(true);
    }
    if (parseInt(indexSelect) === 0) {
      setEnableButtonLeft(true);
    } else {
      setEnableButtonLeft(false);
    }
  }, [indexSelect]);

  //const [addrtype] = useState(months);
  //const Add = addrtype.map((Add) => Add);
  const handleAddrTypeChange = (e) => {
    changeMonth(e.target.value);
    setindexSelect(e.target.value);
  };
  const handleClickButtonRight = (e) => {
    if (parseInt(indexSelect) + 1 < months.length) {
      changeMonth(parseInt(indexSelect) + 1);
      setindexSelect(parseInt(indexSelect) + 1);
    }
  };
  const handleClickButtonLeft = async (e) => {
    if (indexSelect !== 0) {
      await changeMonth(parseInt(indexSelect) - 1);
      await setindexSelect(parseInt(indexSelect) - 1);
    }
  };
  return (
    <div className="SelectAll">
      <a
        onClick={handleClickButtonLeft}
        href="/#"
        className="waves-effect waves-light btn"
        disabled={enableButtonLeft}
      >
        {menor}
      </a>
      <div className="SelectMonth">
        <select
          onChange={(e) => handleAddrTypeChange(e)}
          className="browser-default custom-select negrito "
          value={indexSelect}
        >
          {months.map((address, key) => (
            <option key={key} value={key}>
              {address}
            </option>
          ))}
        </select>
      </div>
      <a
        onClick={handleClickButtonRight}
        href="/#"
        className="waves-effect waves-light btn"
        disabled={enableButtonRight}
      >
        {maior}
      </a>
    </div>
  );
}
export { SelectMonth, monthsEqualDB };

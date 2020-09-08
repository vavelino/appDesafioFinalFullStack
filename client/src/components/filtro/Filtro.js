import React from 'react';

export default function Filtro({ changeFilter, filterInput, clickButton }) {
  const handleChangeFilter = (event) => {
    changeFilter(event.target.value);
  };

  return (
    <div className="Filtro">
      <a
        onClick={clickButton}
        href="/#"
        className="waves-effect waves-light btn"
      >
        + Novo Lançamento
      </a>
      <div className="inputFiltro">
        <input
          value={filterInput}
          onChange={handleChangeFilter}
          placeholder="Filtro"
          type="text"
        />
      </div>
    </div>
  );
}

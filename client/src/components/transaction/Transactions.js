import React from 'react';
const styles = {
  valueRed: {
    backgroundColor: '#f0a1a8',
  },
  valueGreen: {
    backgroundColor: '#a1f2dc',
  },
};
export default function Transactions({
  day,
  category,
  description,
  valuePrice,
  type,
  editButton,
  deleteButton,
  id,
}) {
  const handleEditButton = async (data) => {
    editButton(id);
  };
  const handleDeleteButton = async (data) => {
    deleteButton(id);
  };
  return (
    <div
      className="transaction"
      style={type === '+' ? styles.valueGreen : styles.valueRed}
    >
      <div className="leftInfo">
        <div>
          <h5 className="negrito">{day}</h5>
        </div>
        <div className="information">
          <p className="negrito">{category}</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="rightInfo">
        <div className="valueTransaction negrito">{valuePrice}</div>
        <div className="buttonsTransaction">
          <a
            href="/#"
            className="waves-effect waves-light btn"
            onClick={handleEditButton}
          >
            <i className="large material-icons">create</i>
          </a>
          <a
            href="/#"
            onClick={handleDeleteButton}
            className="waves-effect waves-light red btn"
          >
            <i className="large material-icons">remove_circle</i>
          </a>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function Output({ name, colourName, colourValue, Value }) {
  return (
    <div className="output">
      <label style={{ color: colourName }} className="outputName">
        {name}
      </label>
      <label style={{ color: colourValue }} className="outputValor">
        {Value}
      </label>
    </div>
  );
}

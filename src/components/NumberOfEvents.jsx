import React, { useState } from 'react';

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [number, setNumber] = useState(32);

 const handleInputChanged = (event) => {
  const value = event.target.value;
  const parsedValue = value === '' ? '' : parseInt(value, 10);
  setNumber(parsedValue);
  if (setNumberOfEvents && parsedValue !== '') setNumberOfEvents(parsedValue);
};

  return (
    <div id="number-of-events">
      <label htmlFor="numberInput">Number of Events:</label>
      <input
        type="number"
        id="numberInput"
        role="textbox"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;

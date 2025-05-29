import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setCurrentNOE(value === '' ? '' : parseInt(value, 10));
  };

  return (
    <div id="number-of-events">
      <label htmlFor="numberInput">Number of Events:</label>
      <input
        type="number"
        id="numberInput"
        role="textbox"
        value={currentNOE === '' ? '' : currentNOE}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
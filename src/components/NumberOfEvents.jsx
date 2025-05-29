import React from 'react';

const NumberOfEvents = ({ currentNOE, onNOEChange }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    // Always call onNOEChange, even if value is empty
    onNOEChange(value === '' ? '' : parseInt(value, 10));
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
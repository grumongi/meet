import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;

    if (value === '') {
      setCurrentNOE('');
      setErrorAlert('');
      return;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 100) {
      setErrorAlert('Please enter a valid number between 1 and 100.');
    } else {
      setCurrentNOE(parsedValue);
      setErrorAlert('');
    }
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

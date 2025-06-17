import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { describe, expect, jest, test } from '@jest/globals'; 

describe('<NumberOfEvents /> component', () => {
  test('renders textbox input element', () => {
    const { getByRole } = render(
       <NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} setErrorAlert={() => {}} />);// Mock function for setErrorAlert
    const textbox = getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const { getByRole } = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} setErrorAlert={() => {}} />);// Mock function for setErrorAlert
    const textbox = getByRole('textbox');
    expect(textbox).toHaveValue(32);
  });

  test('allows user to change the number of events', async () => {
  const mockSetNumberOfEvents = jest.fn();
  const mockSetErrorAlert = jest.fn(); // Mock function for setErrorAlert
  render(<NumberOfEvents currentNOE={32} setCurrentNOE={mockSetNumberOfEvents}  setErrorAlert={mockSetErrorAlert} />);// Mock function for setErrorAlert
  const textbox = screen.getByRole('textbox');
  const user = userEvent.setup();

  await user.clear(textbox);
  await user.type(textbox, '10');
  expect(mockSetNumberOfEvents).toHaveBeenCalled();
});
});
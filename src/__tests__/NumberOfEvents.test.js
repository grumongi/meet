import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { describe, expect, jest, test } from '@jest/globals'; 

describe('<NumberOfEvents /> component', () => {
  test('renders textbox input element', () => {
    const { getByRole } = render(
      <NumberOfEvents currentNOE={32} onNOEChange={() => {}} />
    );
    const textbox = getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const { getByRole } = render(
      <NumberOfEvents currentNOE={32} onNOEChange={() => {}} />
    );
    const textbox = getByRole('textbox');
    expect(textbox).toHaveValue(32);
  });

  test('allows user to change the number of events', async () => {
  const mockSetNumberOfEvents = jest.fn();
  render(<NumberOfEvents currentNOE={32} setCurrentNOE={mockSetNumberOfEvents} />);
  const textbox = screen.getByRole('textbox');
  const user = userEvent.setup();

  await user.clear(textbox);
  await user.type(textbox, '10');
  expect(mockSetNumberOfEvents).toHaveBeenCalled();
});
});
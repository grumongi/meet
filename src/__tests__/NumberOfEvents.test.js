import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { describe, expect, jest, test } from '@jest/globals'; 


describe('<NumberOfEvents /> component', () => {
  test('renders textbox input element', () => {
    const { getByRole } = render(
      <NumberOfEvents numberOfEvents={32} setNumberOfEvents={() => {}} />
    );
    const textbox = getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const { getByRole } = render(
      <NumberOfEvents numberOfEvents={32} setNumberOfEvents={() => {}} />
    );
    const textbox = getByRole('textbox');
    expect(textbox).toHaveValue(32);
  });

  test('allows user to change the number of events', async () => {
    const user = userEvent.setup();
    const mockSetNumberOfEvents = jest.fn(); 
    const { getByRole } = render(
      <NumberOfEvents numberOfEvents={32} setNumberOfEvents={mockSetNumberOfEvents} />
    );
    const textbox = getByRole('textbox');
    await user.clear(textbox);
    await user.type(textbox, '10');
    expect(mockSetNumberOfEvents).toHaveBeenLastCalledWith(10);
  });
});

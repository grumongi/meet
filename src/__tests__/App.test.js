import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { describe, test, expect } from '@jest/globals';
import mockData  from '../mock-data';
import events from '../mock-data';

describe('<App /> integration tests', () => {
  test('Scenario 1: Default number of events is 32', () => {
    const { container } = render(<App />);
    const eventItems = container.querySelectorAll('#event-list li');
    expect(eventItems.length).toBeLessThanOrEqual(32);
    expect(eventItems.length).toBe(Math.min(32, mockData[0].items.length));
  });

  test('Scenario 2: User can change number of events', async () => {
    const user = userEvent.setup();
    const { getByRole, container } = render(<App />);
    const textbox = getByRole('textbox');

    await user.clear(textbox);
    await user.type(textbox, '10');

    const eventItems = container.querySelectorAll('#event-list li');
    expect(eventItems.length).toBe(10);
  });

  test('Renders NumberOfEvents input box', () => {
    const { container } = render(<App />);
    const input = container.querySelector('#number-of-events input');
    expect(input).toBeInTheDocument();
  });

  test('Renders the event list container', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#event-list')).toBeInTheDocument();
  });
});

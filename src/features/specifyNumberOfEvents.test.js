import mockData from '../mock-data';

jest.mock('../api', () => ({
getEvents: jest.fn(() => Promise.resolve(mockData[0].items)), // <-- Make sure this is an array!
extractLocations: jest.fn(events => [...new Set(events.map(e => e.location))]),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;

  test('When user hasn’t specified a number, 32 events are shown by default', ({ given, and, then }) => {
    given('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    and('the list of upcoming events is displayed', () => {
      // Already rendered in given
    });

    then(/^the user should see (\d+) events by default$/, async (defaultCount) => {
      const eventItems = await screen.findAllByRole('listitem');
      expect(eventItems.length).toBe(Number(defaultCount));
    });
  });

  test('User can change the number of events displayed', ({ given, and, when, then }) => {
    let numberInput;
    given('the user has opened the app', () => {
      AppComponent = render(<App />);
    });

    and('the list of upcoming events is displayed', () => {
      // Already rendered in given
    });

    when(/^the user enters a specific number in the "(.*)" input field$/, async (inputLabel) => {
      numberInput = screen.getByLabelText(new RegExp(inputLabel, 'i'));
      await userEvent.clear(numberInput);
      await userEvent.type(numberInput, '10');
    });

    then('the app should display that number of events', async () => {
      const eventItems = await screen.findAllByRole('listitem');
      expect(eventItems.length).toBe(10);
    });
  });
});
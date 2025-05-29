import mockData from '../mock-data';

jest.mock('../api', () => ({
  getEvents: jest.fn(() => Promise.resolve(mockData[0].items)),
  extractLocations: jest.fn(events => [...new Set(events.map(e => e.location))]),
}));

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, test, expect } from '@jest/globals';
import App from '../App';
import { getEvents } from '../api'; 

describe('<App /> integration tests', () => {
  test('Scenario 1: Default number of events is 32', async () => {
    const { findAllByRole } = render(<App />);
    const eventItems = await findAllByRole('listitem');
    expect(eventItems.length).toBeLessThanOrEqual(32);
    expect(eventItems.length).toBe(Math.min(32, mockData[0].items.length));
  });

  test('Scenario 2: User can change number of events displayed', async () => {
    const user = userEvent.setup();
    const { getByLabelText, findAllByRole } = render(<App />);
    const numberInput = getByLabelText(/number of events/i);

    // Clear the default value (32) and type "10"
    await user.type(numberInput, '{backspace}{backspace}10');

    // Wait for the event list to update
    const eventItems = await findAllByRole('listitem');
    expect(eventItems.length).toBe(10);
  });
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

describe('<App /> integration', () => {

 test('renders a list of events matching the city selected by the user', async () => {
   const user = userEvent.setup();
   const AppComponent = render(<App />);
   const AppDOM = AppComponent.container.firstChild;


   const CitySearchDOM = AppDOM.querySelector('#city-search');
   const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');


   await user.type(CitySearchInput, "Berlin");
   const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
   await user.click(berlinSuggestionItem);


   const EventListDOM = AppDOM.querySelector('#event-list');
   const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  


   const allEvents = await getEvents();
   const berlinEvents = allEvents.filter(
     event => event.location === 'Berlin, Germany'
   );


   expect(allRenderedEventItems.length).toBe(berlinEvents.length);

   allRenderedEventItems.forEach(event => {
     expect(event.textContent).toContain("Berlin, Germany");
   });
 });

});
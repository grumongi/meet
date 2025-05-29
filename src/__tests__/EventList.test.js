
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from "../App";

// Jest testing environment globals
/* eslint-env jest */


describe('<EventList /> component', () => {
 test('renders correct number of events on rerender', async () => {
    const allEvents = await getEvents(); 
    const EventListComponent = render(<EventList events={[]} />);
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

describe('<EventList /> integration', () => {
test('renders a list of 32 events when the app is mounted and rendered', async () => {
   const AppComponent = render(<App />);
   const AppDOM = AppComponent.container.firstChild;
   const EventListDOM = AppDOM.querySelector('#event-list');
   await waitFor(() => {
     const EventListItems = within(EventListDOM).queryAllByRole('listitem');
     expect(EventListItems.length).toBeGreaterThan(0);
   });
 });

});

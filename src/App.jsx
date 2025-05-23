// src/App.jsx
import React, { useState } from 'react';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import  mockData  from './mock-data'; 
import events from './mock-data'; // or '../mock-data' in tests

const App = () => {
  const [events, setEvents] = useState(mockData[0].items || []);
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  return (
    <div className="App">
      <div id="number-of-events">
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          setNumberOfEvents={setNumberOfEvents}
        />
      </div>
      <EventList events={events.slice(0, numberOfEvents)} />
    </div>
  );
};

export default App;

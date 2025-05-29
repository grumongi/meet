import Event from "./Event";
import React from 'react';

// eslint-disable-next-line react/prop-types
const EventList = ({ events }) => {
  return (
    <ul id="event-list">
  {events
    ? events.map((event, idx) => (
        <Event
          key={event.id || event._id || event.someUniqueValue || idx}
          event={event}
        />
      ))
    : null}
</ul>

  );
};

export default EventList;
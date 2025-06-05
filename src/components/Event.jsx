import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
     <p>{event.start?.dateTime ?? 'No date'}</p>
      <p>{event.location}</p>

      {showDetails && (
        <div className="event-details">
          <p>{event.description}</p>
        </div>
      )}

      <button className="details-btn" onClick={() => setShowDetails(prev => !prev)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </li>
  );
};

export default Event;
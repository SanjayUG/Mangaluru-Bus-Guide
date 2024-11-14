import React from 'react';
import './BusList.css';

function BusList({ buses }) {
  return (
    <div className="bus-list">
      {buses.length > 0 ? (
        buses.map(bus => (
          <div key={bus.id} className="bus-card">
            <h2>{bus.busNumber}</h2>
            <p><strong>From:</strong> {bus.from}</p>
            <p><strong>To:</strong> {bus.to}</p>
            <p><strong>Route:</strong> {bus.routes.join(' -> ')}</p>
          </div>
        ))
      ) : (
        <p>Loading bus data...</p>
      )}
    </div>
  );
}

export default BusList;

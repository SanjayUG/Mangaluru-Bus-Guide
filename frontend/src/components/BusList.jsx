import React from 'react';

function BusList({ buses }) {
  return (
    <div>
      {buses.length > 0 ? (
        buses.map(bus => (
          <div key={bus.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
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

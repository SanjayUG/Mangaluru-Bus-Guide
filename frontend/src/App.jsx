import React, { useEffect, useState } from 'react';
import BusList from './components/BusList';
import './App.css';

function App() {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('Fetching bus data...');
    fetch('http://localhost:3000/api/buses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBuses(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  // Filter buses based on the search term
  const filteredBuses = buses.filter(bus =>
    bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.routes.some(route => route.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h1>Mangalore Bus Guide</h1>
      <input
        type="text"
        placeholder="Search by bus number, from, to, or route"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredBuses.length > 0 ? (
        <BusList buses={filteredBuses} />
      ) : (
        <p className="no-results">No results found</p>
      )}
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import Map from './components/Map'

function App() {
  return (
    <div className="container">
      <h2>Select your address by clicking on the map which will route us to ournearby outlet</h2>
      <Map />
    </div>
  );
}

export default App;

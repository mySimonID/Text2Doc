import React from 'react';
import './App.css';

import Text2Doc from './components/Text2Doc'

function App() {
  return (
    <div className="container">
    <h1>Text2Doc</h1>
      <div className="row">
        <div className="wrapper">
          <Text2Doc filename={`${process.env.PUBLIC_URL}/content/example.txt`} />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import Text2Doc from './components/Text2Doc'

function App() {
  return (
    <div className="container">
    <div className="row">
    <div className="wrapper">
      <Text2Doc filename={'/content/example.txt'} />
    </div>
    </div>
    </div>
  );
}

export default App;

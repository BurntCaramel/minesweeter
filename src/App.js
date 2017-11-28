import React, { Component } from 'react';
import './App.css';
import Game from './organisms/Game'
import { difficulties } from './models/values'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game { ...difficulties.intermediate } />
      </div>
    );
  }
}

export default App;

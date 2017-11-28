import React, { Component } from 'react';
import './App.css';
import Game from './organisms/Game'
import { difficulties } from './models/values'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Game { ...difficulties.intermediate } />
        <nav className='links-nav'>
          <a href='https://github.com/RoyalIcing/minesweeter'>Fork on GitHub</a>
        </nav>
      </div>
    );
  }
}

export default App;

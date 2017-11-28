import React, { Component } from 'react';
import './App.css';
import Game from './organisms/Game'

class App extends Component {
  state = {
    difficultyID: 'intermediate'
  }

  onChangeDifficultyID = ({ target: { value } }) => {
    this.setState({ difficultyID: value })
  }

  render() {
    const { difficultyID } = this.state

    return (
      <div className='App'>
        <Game difficultyID={ difficultyID } />
        <aside className='game-settings'>
          <select value={ difficultyID } onChange={ this.onChangeDifficultyID }>
            <option value='easy'>Easy</option>
            <option value='intermediate'>Intermediate</option>
            <option value='expert'>Expert</option>
          </select>
        </aside>
        <nav className='links-nav'>
          <a href='https://github.com/RoyalIcing/minesweeter'>Fork on GitHub</a>
        </nav>
      </div>
    );
  }
}

export default App;

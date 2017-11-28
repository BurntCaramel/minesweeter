import React from 'react'
import makeOrganism from 'react-organism'
import Board from '../components/Board'
import * as gameModel from '../models/game'
import { gameStates } from '../models/values'

export default makeOrganism(({
  gameState,
  board,
  proximities,
  handlers
}) => (
  <div>
    <button
      className='button -raised -start mb-3'
      onClick={ handlers.restart }
    >
      {
        (gameState === gameStates.gameOver) ? (
          <span role='img' aria-label='Game over: restart game'>
            😵
          </span>
        ) : (
          <span role='img' aria-label='Start game'>
            😃
          </span>
        )
      }
      
    </button>
    <Board
      board={ board }
      proximities={ proximities }
      onUncoverTile={ handlers.uncoverTile }
      onFlagTile={ handlers.flagTile }
    />
  </div>
), gameModel)

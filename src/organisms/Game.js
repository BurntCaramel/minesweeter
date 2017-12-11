import React from 'react'
import makeOrganism from 'react-organism'
import Board from '../components/Board'
import HeaderCounter from '../components/HeaderCounter'
import Timer from '../components/Timer'
import * as gameModel from '../models/game'
import { gameStates } from '../models/values'

function Game({
  gameState,
  board,
  proximities,
  bombsCount,
  flagsCount,
  startedAt,
  finishedAt,
  handlers
}) {
  return <div>
    <header className='game-header mb-3'>
      <HeaderCounter count={ Math.max(bombsCount - flagsCount, 0) } />
      <button
        className='button -raised -start'
        onMouseDown={ handlers.beginRestart}
        onClick={ handlers.completeRestart }
      >
        {
          (gameState === gameStates.gameOver) ? (
            <span role='img' aria-label='Game over: restart game'>
              😵
            </span>
          ) : (gameState === gameStates.winner) ? (
            <span role='img' aria-label='Restart game'>
              😎
            </span>
          ) : (gameState === gameStates.beginningMove) ? (
            <span role='img' aria-label='Restart game'>
              😮
            </span>
          ) : (
            <span role='img' aria-label='Start game'>
              😃
            </span>
          )
        }
      </button>
      <Timer
        startedAt={ startedAt }
        finishedAt={ finishedAt  }
      />
    </header>
    <Board
      gameState={ gameState }
      board={ board }
      proximities={ proximities }
      onBeginUncoverTile={ handlers.beginUncoverTile }
      onUncoverTile={ handlers.uncoverTile }
      onFlagTile={ handlers.flagTile }
    />
  </div>
}

export default makeOrganism(Game, gameModel)

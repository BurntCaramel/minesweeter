import React from 'react'
import Tile from './Tile'
import { gameStates } from '../models/values'

export default function Board({
  gameState,
  board,
  proximities,
  onBeginUncoverTile,
  onUncoverTile,
  onFlagTile
}) {
  return (
    <div className='board'>
    {
      board.map((row, rowIndex) => (
        <div
          key={ rowIndex }
          className='board-row'
        >
        {
          row.map((tile, colIndex) => (
            <Tile
              key={`r${rowIndex} c${colIndex}`}
              { ...tile }
              showBombs={ gameState === gameStates.gameOver }
              proximityCount={ proximities[rowIndex][colIndex] }
              onBeginUncover={ () => onBeginUncoverTile({ rowIndex, colIndex }) }
              onUncover={ () => onUncoverTile({ rowIndex, colIndex }) }
              onFlag={ () => onFlagTile({ rowIndex, colIndex }) }
            />
          ))
        }
        </div>
      ))
    }
    </div>
  )
}
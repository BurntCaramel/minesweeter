import React from 'react'
import Tile from './Tile'

export default function Board({
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
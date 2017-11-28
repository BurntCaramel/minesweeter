import React from 'react'
import Tile from './Tile'

export default function Board({
  board
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
            />
          ))
        }
        </div>
      ))
    }
    </div>
  )
}
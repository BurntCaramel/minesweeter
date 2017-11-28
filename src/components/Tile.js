import React from 'react'
import { tileBombStates, tileUserStates } from '../models/values'

export default function Tile({
  bombState,
  userState,
  proximityCount,
  onBeginUncover,
  onUncover,
  onFlag
}) {
  const className = [
    'tile',
    userState === tileUserStates.covered && '-covered',
    userState === tileUserStates.flag && '-flag',
    userState === tileUserStates.hitBomb && '-hitBomb',
    userState === tileUserStates.open && '-open',
    userState === tileUserStates.open && `-proximity-${proximityCount}`
  ].filter(Boolean).join(' ')

  return (
    <button
      className={ className }
      onMouseDown={ (event) => {
        if (event.button === 0) {
          onBeginUncover()
        }
      } }
      onClick={ (event) => {
        onUncover()
      } }
      onContextMenu={ (event) => {
        event.preventDefault()
        // event.stopPropagation()
        onFlag()
      } }
    >
      {
        (userState === tileUserStates.covered) ? (
          ''
        ) : (userState === tileUserStates.flag) ? (
          '🚩'
        ) : (
          (bombState === tileBombStates.blank) ? (
            (proximityCount === 0) ? (
              ''
            ) : (
              proximityCount
            )
          ) : (
            '💣'
          )
        )
      }
    </button>
  )
}
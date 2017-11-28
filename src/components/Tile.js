import React from 'react'
import { tileBombStates, tileUserStates } from '../models/values'

export default function Tile({
  bombState,
  userState,
  proximityCount,
  onUncover
}) {
  const className = [
    'tile',
    userState === tileUserStates.covered && '-covered',
    userState === tileUserStates.flag && '-flag',
    userState === tileUserStates.hitBomb && '-hitBomb',
    userState === tileUserStates.open && '-open',
  ].filter(Boolean).join(' ')

  return (
    <div className={ className } onClick={ onUncover }>
      {
        (userState === tileUserStates.covered) ? (
          ''
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
    </div>
  )
}
import React from 'react'
import { tileBombStates, tileUserStates } from '../models/values'

export default function Tile({
  bombState,
  userState
}) {
  return (
    <div className='tile'>
      {
        (bombState === tileBombStates.blank) ? (
          ''
        ) : (
          '💣'
        )
      }
    </div>
  )
}
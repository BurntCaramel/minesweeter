import React from 'react'
import makeOrganism from 'react-organism'
import Board from '../components/Board'
import * as gameModel from '../models/game'

export default makeOrganism(({
  board,
  proximities,
  handlers
}) => (
  <Board
    board={ board }
    proximities={ proximities }
    onUncoverTile={ handlers.uncoverTile }
    onFlagTile={ handlers.flagTile }
  />
), gameModel)

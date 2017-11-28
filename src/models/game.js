import times from 'lodash/times'
import { tileBombStates, tileUserStates } from './values'
import { countProximities } from './calculations'

export const initial = ({
  columns = 9,
  rows = 9,
  bombOdds = 0.1
}) => {
  const board = times(rows, () => (
    times(columns, () => ({
      bombState: Math.random() <= bombOdds ? tileBombStates.bomb : tileBombStates.blank,
      userState: tileUserStates.covered
    }))
  ))

  const proximities = countProximities(board)

  return {
    board,
    proximities
  }
}

export const uncoverTile = (props, { rowIndex, colIndex }) => ({ board }) => {
  console.log('uncoverTile', rowIndex, colIndex)
  const tile = board[rowIndex][colIndex]
  const newTile = (tile.bombState === tileBombStates.bomb) ? (
    { ...tile, userState: tileUserStates.hitBomb }
  ) : (
    { ...tile, userState: tileUserStates.open }
  )

  board[rowIndex][colIndex] = newTile

  const proximities = countProximities(board)

  return { board, proximities }
}

export const flagTile = (props, { rowIndex, colIndex }) => ({ board }) => {
  console.log('flagTile', rowIndex, colIndex)

  return {
    board: board.map((row, currentRowIndex) => (
      row.map((item, currentColIndex) => (
        (rowIndex === currentRowIndex && colIndex === currentColIndex) ? (
          { ...item, userState: tileUserStates.flag }
        ) : (
          item
        )
      ))
    ))
  }
}

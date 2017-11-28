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

const changeBoardItem = (board, rowIndex, colIndex, changeItem) => (
  board.map((row, currentRowIndex) => (
    row.map((item, currentColIndex) => (
      (rowIndex === currentRowIndex && colIndex === currentColIndex) ? (
        changeItem(item)
      ) : (
        item
      )
    ))
  ))
)

export const uncoverTile = (props, { rowIndex, colIndex }) => ({ board, proximities }) => {
  const newBoard = changeBoardItem(board, rowIndex, colIndex, (item) => (
    (item.bombState === tileBombStates.bomb) ? (
      { ...item, userState: tileUserStates.hitBomb }
    ) : (
      { ...item, userState: tileUserStates.open }
    )
  ))

  const newProximities = countProximities(newBoard)

  return { board: newBoard, proximities: newProximities }
}

export const flagTile = (props, { rowIndex, colIndex }) => ({ board }) => {
  console.log('flagTile', rowIndex, colIndex)

  return {
    board: changeBoardItem(board, rowIndex, colIndex, (item) => (
      { ...item, userState: tileUserStates.flag }
    ))
  }
}

import times from 'lodash/times'
import { tileBombStates, tileUserStates } from './values'
import { countProximities, allDirections } from './calculations'

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
    columns,
    rows,
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

const copyBoard = (board) => (
  board.map((row) => row.slice())
)

const changeItemToUncovered = (item) => (
  (item.bombState === tileBombStates.bomb) ? (
    { ...item, userState: tileUserStates.hitBomb }
  ) : (
    { ...item, userState: tileUserStates.open }
  )
)

const canExpandTile = (item, proximity) => (item.bombState === tileBombStates.blank && proximity === 0)

export const uncoverTile = (props, { rowIndex, colIndex }) => ({ board, proximities, rows, columns }) => {
  let newBoard = copyBoard(board)
  const coordsOpened = new Set()

  const uncoverInNewBoard = (rowIndex, colIndex) => {
    const item = newBoard[rowIndex][colIndex]
    const proximity = proximities[rowIndex][colIndex]
    const coordKey = `${rowIndex},${colIndex}`
    // If already opened
    if (coordsOpened.has(coordKey)) {
      return
    }

    newBoard[rowIndex][colIndex] = changeItemToUncovered(newBoard[rowIndex][colIndex])
    coordsOpened.add(coordKey)

    if (canExpandTile(item, proximity)) {
      allDirections.forEach((f) => {
        const [r, c] = f(rowIndex, colIndex)
        if (r < rows && r >= 0 && c < columns && c >= 0) {
          uncoverInNewBoard(r, c)
        }
      })
    }
  }

  uncoverInNewBoard(rowIndex, colIndex)

  return { board: newBoard }
}

export const flagTile = (props, { rowIndex, colIndex }) => ({ board }) => {
  console.log('flagTile', rowIndex, colIndex)

  return {
    board: changeBoardItem(board, rowIndex, colIndex, (item) => (
      { ...item, userState: tileUserStates.flag }
    ))
  }
}

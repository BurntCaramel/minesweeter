import times from 'lodash/times'
import { gameStates, tileBombStates, tileUserStates } from './values'
import { countProximities, allDirections } from './calculations'

export const restart = ({
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
    gameState: gameStates.fresh,
    columns,
    rows,
    board,
    proximities
  }
}

export const initial = (props) => restart(props)

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

export const uncoverTile = (props, { rowIndex, colIndex }) => ({ gameState, board, proximities, rows, columns }) => {
  if (gameState !== gameStates.fresh && gameState !== gameStates.playing) {
    return
  }

  let gameOver = false
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

    const newItem = changeItemToUncovered(newBoard[rowIndex][colIndex])
    gameOver = newItem.userState === tileUserStates.hitBomb
    newBoard[rowIndex][colIndex] = newItem
    coordsOpened.add(coordKey)

    if (gameOver) {
      return
    }

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

  return { board: newBoard, gameState: gameOver ? gameStates.gameOver : gameStates.playing }
}

export const flagTile = (props, { rowIndex, colIndex }) => ({ board }) => {
  console.log('flagTile', rowIndex, colIndex)

  return {
    board: changeBoardItem(board, rowIndex, colIndex, (item) => (
      (item.userState === tileUserStates.covered) ? (
        { ...item, userState: tileUserStates.flag }
      ) : (
        item
      )
    ))
  }
}

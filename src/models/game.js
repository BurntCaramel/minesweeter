import times from 'lodash/times'
import { gameStates, tileBombStates, tileUserStates } from './values'
import { countProximities, allDirections } from './calculations'

const restart = ({
  columns = 9,
  rows = 9,
  bombOdds = 0.12
}) => {
  let bombsCount = 0

  const board = times(rows, () => (
    times(columns, () => {
      const hasBomb = Math.random() <= bombOdds
      bombsCount += (hasBomb ? 1 : 0)
      return {
        bombState: hasBomb ? tileBombStates.bomb : tileBombStates.blank,
        userState: tileUserStates.covered
      }
    })
  ))

  const proximities = countProximities(board)

  return {
    gameState: gameStates.fresh,
    columns,
    rows,
    board,
    proximities,
    bombsCount,
    uncoveredCount: 0,
    movesCount: 0
  }
}

export const initial = (props) => restart(props)

export const beginRestart = () => ({ gameState: gameStates.restarting })
export const completeRestart = restart

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

const canPlayForGameState = (gameState) => (
  gameState === gameStates.fresh || gameState === gameStates.playing || gameState === gameStates.beginningMove
)

const canExpandTile = (item, proximity) => (
  item.bombState === tileBombStates.blank && proximity === 0
)

export const beginUncoverTile = () => ({ gameState }) => {
  if (!canPlayForGameState(gameState)) {
    return
  }

  return { gameState: gameStates.beginningMove }
}

export const uncoverTile = (props, { rowIndex, colIndex }) => ({
  gameState, board, proximities, rows, columns, bombsCount, uncoveredCount, movesCount
}) => {
  if (!canPlayForGameState(gameState)) {
    return
  }

  let gameOver = false
  let newBoard = copyBoard(board)

  const uncoverInNewBoard = (rowIndex, colIndex) => {
    if (gameOver) {
      return
    }

    const item = newBoard[rowIndex][colIndex]
    const proximity = proximities[rowIndex][colIndex]
    if (item.userState === tileUserStates.open) {
      return
    }

    const newItem = changeItemToUncovered(newBoard[rowIndex][colIndex])
    newBoard[rowIndex][colIndex] = newItem

    gameOver = newItem.userState === tileUserStates.hitBomb
    if (gameOver) {
      return
    }

    uncoveredCount += 1

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

  return {
    board: newBoard,
    gameState: gameOver ? (
      gameStates.gameOver
    ) : (
      (uncoveredCount + bombsCount === columns * rows) ? (
        gameStates.winner
      ) : (
        gameStates.playing
      )
    ),
    uncoveredCount,
    movesCount: movesCount + 1
  }
}

export const flagTile = (props, { rowIndex, colIndex }) => ({ board }) => ({
  board: changeBoardItem(board, rowIndex, colIndex, (item) => (
    (item.userState === tileUserStates.covered) ? (
      { ...item, userState: tileUserStates.flag }
    ) : (item.userState === tileUserStates.flag) ? (
      { ...item, userState: tileUserStates.covered }
    ) : (
      item
    )
  ))
})

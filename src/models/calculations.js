import { tileBombStates } from './values'

const indexInDirection = {
  n: (rowIndex, colIndex) => [rowIndex - 1, colIndex],
  s: (rowIndex, colIndex) => [rowIndex + 1, colIndex],
  w: (rowIndex, colIndex) => [rowIndex, colIndex - 1],
  e: (rowIndex, colIndex) => [rowIndex, colIndex + 1],
  nw: (rowIndex, colIndex) => [rowIndex - 1, colIndex - 1],
  ne: (rowIndex, colIndex) => [rowIndex - 1, colIndex + 1],
  sw: (rowIndex, colIndex) => [rowIndex + 1, colIndex - 1],
  se: (rowIndex, colIndex) => [rowIndex + 1, colIndex + 1]
}
const allDirections = [
  indexInDirection.n,
  indexInDirection.s,
  indexInDirection.w,
  indexInDirection.e,
  indexInDirection.nw,
  indexInDirection.ne,
  indexInDirection.sw,
  indexInDirection.se
]

const empty = []

export function countProximities(board) {
  const safeAccessTile = (rowIndex, colIndex) => (board[rowIndex] || empty)[colIndex]

  return board.map((row, rowIndex) => (
    row.map((tile, colIndex) => (
      allDirections.reduce((total, f) => {
        const [r, c] = f(rowIndex, colIndex)
        const tile = safeAccessTile(r, c)
        if (!!tile && tile.bombState === tileBombStates.bomb) {
          return total + 1
        }
        else {
          return total
        }
      }, 0)
    ))
  ))
}
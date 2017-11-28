export const gameStates = {
  fresh: 0,
  restarting: 1,
  playing: 2,
  beginningMove: 3,
  winner: 20,
  gameOver: 30
}

export const tileBombStates = {
  blank: 0,
  bomb: 1
}

export const tileUserStates = {
  covered: 0,
  flag: 1,
  open: 2,
  hitBomb: 3
}
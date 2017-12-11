export const gameStates = {
  fresh: 0, // Has not made a move yet
  restarting: 1, // About to restart
  playing: 2, // Has made first move
  beginningMove: 3, // About to make a move
  winner: 20, // Won the game
  gameOver: 30 // Lost the game
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

export const difficulties = {
  easy: {
    columns: 8,
    rows: 8,
    bombOdds: 10/(8*8)
  },
  intermediate: {
    columns: 16,
    rows: 16,
    bombOdds: 40/(16*16)
  },
  expert: {
    columns: 30,
    rows: 16,
    bombOdds: 99/(30*16)
  }
}
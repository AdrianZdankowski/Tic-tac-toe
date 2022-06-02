import { updateTurnText,updateWinnerText, openNav, closeNav } from "./ui.js"

const resetbtn = document.getElementById("resetbtn")
const cells = document.querySelectorAll(".cell")
const selectGamemodeBtn = document.getElementById("selectGamemodeBtn")

let selectedGamemode
let round = "X"
let winner = false

let board = Array.from({ length: 3 }).map(_ => [null, null, null])
updateTurnText(round)

const exists = (arr, search) => arr.some(row => row.includes(search))

function resetBoard() {
  winner = false
  board = board.map(_ => [null, null, null])

  cells.forEach(cell => {
    cell.textContent = ""
    cell.addEventListener("click", handleClick, { once: true })
  })

  round = "X"
  updateTurnText(round)
}

const setGamemode = event => {
  const mode = event.target

  if (mode.id != selectedGamemode) {
    resetBoard()
  }
  selectedGamemode = mode.id
  closeNav()
}

function drawAIO() {
  let x
  let y

  do {
    x = Math.floor(Math.random() * 3)
    y = Math.floor(Math.random() * 3)
  } while (board[x][y] != null)

  board[x][y] = round
  document.getElementById(`${x}${y}`).textContent = round

  round = "X"
  updateTurnText(round)

  winner = checkWin()
}

function checkWin() {
  // Horizontal lines
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] == board[i][1] &&
      board[i][0] == board[i][2] &&
      board[i][0] != null
    ) {
      updateWinnerText(board[i][0])
      return true
      // clearTimeout(circle)
    }
  }

  // Vertical lines
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] == board[1][i] &&
      board[0][i] == board[2][i] &&
      board[0][i] != null
    ) {
      updateWinnerText(board[0][i])
      return true
      // clearTimeout(circle)
    }
  }

  // Diagonal lines
  if (
    board[0][0] == board[1][1] &&
    board[0][0] == board[2][2] &&
    board[0][0] != null
  ) {
    updateWinnerText(board[0][0])
    return true
    // clearTimeout(circle)
  }

  if (
    board[2][0] == board[1][1] &&
    board[2][0] == board[0][2] &&
    board[2][0] != null
  ) {
    updateWinnerText(board[2][0])
    return true
    // clearTimeout(circle)
  }

  // Tie
  if (!exists(board, null) && winner == null) {
    updateWinnerText(null)
    return true
    // clearTimeout(circle)
  }
}

const handleClick = event => {
  const item = event.target
  if (selectedGamemode != null)
    if (!winner) {
      if (board[item.id[0]][item.id[1]] == null) {
        item.textContent = round
        board[item.id[0]][item.id[1]] = round
        round = round == "X" ? "O" : "X"
        updateTurnText(round)
      }
      winner = checkWin()

      if (
        selectedGamemode == "ai" &&
        round == "O" &&
        exists(board, null) &&
        !winner
      ) {
        // circle = setTimeout(drawAIO, 500)
        drawAIO()
      }
    }
}

openNav(setGamemode)
selectGamemodeBtn.addEventListener("click", () => openNav(setGamemode))

cells.forEach(cell =>
  cell.addEventListener("click", handleClick, { once: true })
)

resetbtn.addEventListener("click", resetBoard)

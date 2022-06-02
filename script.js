const turn = document.getElementById("turn")
const resetbtn = document.getElementById("resetbtn")
const cells = document.querySelectorAll(".cell")
const gamemodes = document.querySelectorAll(".gamemode")
const selectGamemodeBtn = document.getElementById("selectGamemodeBtn")

let selectedGamemode = null
let circle = null
let round = "X"
let winner = false

const board = Array.from({ length: 3 }).map(_ => [null, null, null])
turn.textContent = round + "'s turn"

const exists = (arr, search) => arr.some(row => row.includes(search))

function openNav() {
    document.getElementById("select_gamemode").style.height = "100%";
}

function closeNav() {
    document.getElementById("select_gamemode").style.height = "0%";
    gamemodes.forEach(mode => mode.addEventListener("click", gamemodePick, { once: true }))
}

function resetBoard() {
    winner = null
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = null
        }
    }

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = ""
        cell.addEventListener("click", handleClick, { once: true })
    })

    round = "X"
    turn.textContent = round + "'s turn"
}

const gamemodePick = event => {
    const mode = event.target
   
    if (mode.id != selectedGamemode) {
        resetBoard()
    }
    selectedGamemode = mode.id
    closeNav()
}

function drawAIO() {
    let x = null
    let y = null
    do {
        x = Math.floor(Math.random() * 3);
        y = Math.floor(Math.random() * 3);
    }
    while (board[x][y] != null)
    board[x][y] = round
    cellID = String(x) + String(y)
    document.getElementById(cellID).textContent = round
    round = "X"
    turn.textContent = round + "'s turn"
}


function checkWin() {
     // Horizontal lines
     for (let i = 0; i < 3; i++) {
        if (
            board[i][0] == board[i][1] &&
            board[i][0] == board[i][2] &&
            board[i][0] != null
        ) {
            turn.textContent = board[i][0] + " wins!"
            winner = true
            // clearTimeout(circle)
            break
        }
    }

    // Vertical lines
    for (let i = 0; i < 3; i++) {
        if (
            board[0][i] == board[1][i] &&
            board[0][i] == board[2][i] &&
            board[0][i] != null
        ) {
            turn.textContent = board[0][i] + " wins!"
            winner = true
            // clearTimeout(circle)
            break
        }
    }

    // Diagonal lines
    if (
        board[0][0] == board[1][1] &&
        board[0][0] == board[2][2] &&
        board[0][0] != null
    ) {
        turn.textContent = board[0][0] + " wins!"
        winner = true
        // clearTimeout(circle)
    }

    if (
        board[2][0] == board[1][1] &&
        board[2][0] == board[0][2] &&
        board[2][0] != null
    ) {
        turn.textContent = board[2][0] + " wins!"
        winner = true
        // clearTimeout(circle)
    }

   
    
    // Tie
    if (!exists(board, null) && winner == null) {
        turn.textContent = "Tie!"
        winner = true
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
                turn.textContent = round + "'s turn"
            }
            checkWin()
           
            if (selectedGamemode == "ai" && round == "O" && exists(board, null) && !winner) {
                // circle = setTimeout(drawAIO, 500)
                drawAIO()
            }
            checkWin()
        }
}

gamemodes.forEach(mode => mode.addEventListener("click", gamemodePick, { once: true }))

selectGamemodeBtn.addEventListener("click", openNav)

cells.forEach(cell =>
    cell.addEventListener("click", handleClick, { once: true })
)

resetbtn.addEventListener("click", resetBoard)

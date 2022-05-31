const turn = document.getElementById("turn")
const resetbtn = document.getElementById("resetbtn")
let round = "X"
const board = [[null, null, null], [null, null, null], [null, null, null]]
let winner = null
turn.innerHTML = round + "'s turn"

function exists(arr, search) {
    return arr.some(row => row.includes(search));
}

document.querySelectorAll('.cell').forEach(item => {
    item.addEventListener('click', event => {
        if (winner == null) {
        if (round == "X" && (board[item.id[0]][item.id[1]]) === null) {
            item.innerHTML = round
            board[item.id[0]][item.id[1]] = round
            round = "O"
            turn.innerHTML = round + "'s turn"
        }

        if (round == "O" && (board[item.id[0]][item.id[1]]) === null) {
            item.innerHTML = round
            board[item.id[0]][item.id[1]] = round
            round = "X"
            turn.innerHTML = round + "'s turn"
        }

        //Horizontal lines
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] != null) {
                turn.innerHTML = board[i][0] + " wins!"
                winner = 1
                break
            }
        }

        //Vertical lines
        for (let i = 0; i < 3; i++) {
            if (board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] != null) {
                turn.innerHTML = board[0][i] + " wins!"
                winner = 1
                break
            }
        }

        //Diagonal lines
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != null) {
            turn.innerHTML = board[0][0] + " wins!"
                winner = 1
                
        }

        if (board[2][0] == board[1][1] && board[2][0] == board[0][2] && board[2][0] != null) {
            turn.innerHTML = board[2][0] + " wins!"
                winner = 1
             
            }
            
            if (!exists(board, null) && winner == null) {
                turn.innerHTML = "Tie!"
                winner = 1
            }
        }
        
    })
})

resetbtn.addEventListener("click", () => {
    winner = null
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = null
        }
    }
    
    document.querySelectorAll('.cell').forEach(item => {
        item.innerHTML = ''
    })

    round = "X"
    turn.innerHTML = round + "'s turn"
    
})

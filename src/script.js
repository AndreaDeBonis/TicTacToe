const Game = (function () {

    const board = Array(9).fill("")
    const boardDOM = document.querySelector("#game-board")
    const playerDOM = document.querySelector("#player")
    let gameEnd = false
    let currentPlayer = "x"
    
    
    const clickHandler = function (e) {
        addSymbol(e.target.id)
        if (gameEnd) boardDOM.removeEventListener("click", clickHandler)
    }

    const start = function() {
        Game()
        render()
    }

    const render = function (string = `Player ${currentPlayer.toUpperCase()} turn`) {
        board.forEach((el, index) => document.getElementById(index).innerText = el)
        playerDOM.innerText = string
    }
        
    const updatePlayerState = function() {
        if (currentPlayer == "x") currentPlayer = "o"
        else currentPlayer = "x"
    }

    const addSymbol = function (cell) {
        if ((board[cell] == "") && !gameEnd) { 
            board[cell] = currentPlayer           
            if (checkWinner(cell)) {
                gameEnd = true
                render(`Player ${currentPlayer.toUpperCase()} wins`)
            }
            else {
                updatePlayerState()    
                render()}
        }
        else return
    }

    const checkWinner = function (cell) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        cell = Number(cell)
        let result = winConditions.filter((combinations) => combinations.includes(cell)).some((combination) => combination.every((cellIndex) => board[cellIndex] == currentPlayer))
        return result
        
    }

    boardDOM.addEventListener("click", clickHandler)

    render()

    return {addSymbol, start}

})

document.querySelector("#start").addEventListener("click", Game)


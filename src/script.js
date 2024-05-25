const Game = (function () {

    const board = Array(9).fill("")
    const boardDOM = document.querySelector("#game-board")
    const playerDOM = document.querySelector("#player")
    const startButton = document.querySelector('#start')
    let draw = false
    let gameEnd = false
    let currentPlayer = "x"
    
    
    const clickHandler = function (e) {
        if (startButton.classList.contains('invisible')) buttonShow()
        addSymbol(e.target.id)
    }

    const buttonShow = function () {
        startButton.classList.remove("invisible")
    }

    const buttonHide = function () {
        startButton.classList.add('invisible')
    }

    const start = function() {
        buttonHide()
        board.fill("")
        draw = false
        gameEnd = false
        render()
    }

    const render = function (string = `PLAYER ${currentPlayer.toUpperCase()} TURN`) {
        board.forEach((el, index) => {
            const cell = document.getElementById(index)
            cell.innerHTML = `<div class="text-7xl">${el}</div>`
        })
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
                render(`PLAYER ${currentPlayer.toUpperCase()} WINS`)
                
            }
            
            else if (draw) {
                render("IT'A DRAW")
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
        if (board.every((cell) => cell != "")) draw = true
        return result
        
    }

    boardDOM.addEventListener("click", clickHandler)
    startButton.addEventListener("click", start)
    render()

    return {addSymbol, start}

})()




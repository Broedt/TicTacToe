
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

const render = () => {
    document.querySelector(".gameboard").style.display = "grid";

    let boardHTML = "";

    gameboard.forEach((square, index) => {
        boardHTML += `<div class="square" id="square-${index}"> ${square} </div>`
    });

    document.querySelector(".gameboard").innerHTML = boardHTML;

    let squares = document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener("click", Game.handleClick)
        })
}
    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    const getGameboard = () => gameboard;


    return {
        render,
        update,
        getGameboard
    }

})();

const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }

};

const Game = (() => {
    let players = [];
    let currentPlayerIndex; 
    let gameOver;
    let resultMessage;

    const start = () =>{
        players = [
            createPlayer(document.querySelector("#playerOne").value, "X"),
            createPlayer(document.querySelector("#playerTwo").value, "O")
        ];
        for (let i=0; i<9; i++){
            Gameboard.update(i, "");
         }
        
        currentPlayerIndex = 0;
        gameOver = false;

        Gameboard.render();
        console.log(players)
        document.querySelector("#displayResult").innerHTML = "";
        document.querySelector("#displayResult").style.display = "none";

    
    }

     const restart = () =>{
        for (let i=0; i<9; i++){
           Gameboard.update(i, "");
        }
        currentPlayerIndex = 0;
        gameOver = false;
        
        document.querySelector("#displayResult").innerHTML = "";
        document.querySelector("#displayResult").style.display = "none";
    }
    

    const handleClick = (event) => {

        if (gameOver === true){
            return
        }
        let index = parseInt(event.target.id.split("-")[1]);        
        if(Gameboard.getGameboard()[index] !== ""){
            return
        }

        Gameboard.update(index, players[currentPlayerIndex].marker);
        if (checkForWinner(Gameboard.getGameboard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            resultMessage =`${players[currentPlayerIndex].name} has won!`;
            document.querySelector("#displayResult").style.display = "block";
            document.querySelector("#displayResult").innerHTML = resultMessage;
        }
        else if (checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            resultMessage = " it´s a Tie!";
            document.querySelector("#displayResult").style.display = "block";
            document.querySelector("#displayResult").innerHTML = resultMessage;
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        
    }

    const checkForWinner = (board) => {
        let winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i = 0; i < winningCombinations.length; i++){
            const [a,b,c] = winningCombinations[i]
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]){
                return true;
                
            }
        }
    }

    const checkForTie = (board) => {
        const itsATie = board.every((slot) => slot !== "")
        return itsATie
    }

    return {
        start,
        handleClick,
        restart,
    }
})();

const restartButton = document.querySelector("#resetButton")
restartButton.addEventListener("click", () => {
    Game.restart()
})

const startButton = document.querySelector("#startButton")
startButton.addEventListener("click", () => {
    Game.start()
});

/* html erstellen, mit 
input für beide player
startButton und restartButton
------------------------
Gameboard erstellen (array mit 9 leeren slots)
für jeden slot ein div erstellen lassen mit einer function
jedem div ein click event hinzufügen
*/

const Gameboard = (function() {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    let render = () => {

    let boardHTML = "";

    gameboard.forEach((square, index) => {
        boardHTML += `<div class="square" id="square-${index}>${square}</div>`
    });

    document.getElementsByClassName("gameboard").innerHTML = boardHTML
    }

    return {
        render
    }
})();
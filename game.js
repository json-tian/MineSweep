//Jason's Original Minesweeper

var origBoard;  //Board

const cells = document.querySelectorAll('.cell');   //Get cells from html
var clicks = 0;
const cellsState = new Array(100);  
cellsState.fill('');
var h1 = document.querySelectorAll('h1')[0]
var milliseconds = 0
var seconds = 0
var minutes = 0
var t;
var gameFinished = false;

function add() {
    milliseconds++;
    if (milliseconds >= 10) {
        milliseconds = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                clearTimeout(t);
            }
        }
    }

    h1.innerText = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + milliseconds;

    timer();
}
function timer() {
    t = setTimeout(add, 100);
}

function startGame(mines) {
    gameFinished = false;
    clearTimeout(t);
    clicks = 0;
    h1.innerText = "00:00:0";
    seconds = 0;
    minutes = 0;
    milliseconds = 0;
    cellsState.fill('');

    document.querySelector(".endgame").style.display = "none";  //Ignore css styles
    origBoard = Array.from(Array(100).keys()); //Create array of 100 elements (0-99)
    for (var y = 0; y < cells.length; y ++) {
        cells[y].innerText = '';
        cells[y].style.background = 'gainsboro';
        cells[y].style.color = 'black';

    }
    for (var j = 0; j < mines; j ++) {
        var placed = false;
        do {
            var temp = Math.floor(Math.random()*100);
            if (cellsState[temp] != '*') {
                placed = true;
                cellsState[temp]= '*';
            }
        } while (placed == false);
    }

    for (var i = 0; i < cells.length; i++) {
        //Reset cells
        var surroundingMines = 0;
        if (cellsState[i] != ('*')) {
        
            if (i%10 == 0) {    //If it is on left side
                if (i == 0) {   //If it is on the top left corner
                    if (cellsState[i+1] == ('*')) 
                        surroundingMines += 1;
                    if (cellsState[i+10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+11] == ('*'))
                        surroundingMines += 1;
                } else if (i == 90) {    //If it is on the bottom left corner
                    if (cellsState[i+1] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-9] == ('*'))
                        surroundingMines += 1;
                } else {    //Otherwise...
                    if (cellsState[i+1] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-9] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+11] == ('*'))
                        surroundingMines += 1;
                }
            } else if ((i-9) % 10 == 0) {   //If it is on the right side
                if (i == 9) {   //If it is on the top right corner
                    if (cellsState[i-1] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+9] == ('*'))
                        surroundingMines += 1;
                } else if (i == 99) {   //If it is on the bottom right corner
                    if (cellsState[i-1] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-11] == ('*'))
                        surroundingMines += 1;
                } else {    //Otherwise...
                    if (cellsState[i-1] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i-11] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+10] == ('*'))
                        surroundingMines += 1;
                    if (cellsState[i+9] == ('*'))
                        surroundingMines += 1;
                }
            } else if (i > 90 && i < 99) {  //Bottom row not corner
                if (cellsState[i-1] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+1] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i-10] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i-11] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i-9] == ('*'))
                        surroundingMines += 1;
            } else if (i > 0 && i < 9) {    //Top row not corner
                if (cellsState[i-1] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+1] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+10] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+11] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+9] == ('*'))
                        surroundingMines += 1;
            } else {    //Any non-border pieces
                if (cellsState[i-1] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+1] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+10] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+11] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i+9] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i-10] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i-11] == ('*'))
                        surroundingMines += 1;
                if (cellsState[i-9] == ('*'))
                        surroundingMines += 1;
            }
            if (surroundingMines != 0 && cellsState[i] != '*') {
                cellsState[i] = surroundingMines;
            } else {
                cells[i].style.background = 'ghostwhite';
            }
            switch (cellsState[i]) {
                case 1:
                    cells[i].style.color = 'blue';
                    break;
                case 2:
                    cells[i].style.color = 'green';
                    break;
                case 3:
                    cells[i].style.color = 'red';
                    break;
                case 4:
                    cells[i].style.color = 'purple';
                    break;
                case 5:
                    cells[i].style.color = 'brown';
                    break;
                case 6:
                    cells[i].style.color = 'aquamarine';
                    break;
                case 7:
                    cells[i].style.color = 'black';
                    break;
                case 8:
                    cells[i].style.color = 'gray';
                    break;
            }

        }
    }

    for (var i = 0; i < 100; i ++) {

        if (cellsState[i] == 0) {

            if (i%10 == 0) {    //If it is on left side
                if (i == 0) {   //If it is on the top left corner
                    cells[i+1].innerText = cellsState[i+1];
                    cells[i+10].innerText = cellsState[i+10];
                    cells[i+11].innerText = cellsState[i+11];
                } else if (i == 90) {    //If it is on the bottom left corner
                    cells[i+1].innerText = cellsState[i+1];
                    cells[i-10].innerText = cellsState[i-10];
                    cells[i-9].innerText = cellsState[i-9];
                } else {    //Otherwise...
                   cells[i+1].innerText = cellsState[i+1];
                    cells[i-10].innerText = cellsState[i-10];
                    cells[i-9].innerText = cellsState[i-9];
                    cells[i+10].innerText = cellsState[i+10];
                    cells[i+11].innerText = cellsState[i+11];
                }
            } else if ((i-9) % 10 == 0) {   //If it is on the right side
                if (i == 9) {   //If it is on the top right corner
                    cells[i-1].innerText = cellsState[i-1];
                    cells[i+10].innerText = cellsState[i+10];
                    cells[i+9].innerText = cellsState[i+9];
                } else if (i == 99) {   //If it is on the bottom right corner
                    cells[i-1].innerText = cellsState[i-1];
                    cells[i-10].innerText = cellsState[i-10];
                    cells[i-11].innerText = cellsState[i-11];
                } else {    //Otherwise...
                    cells[i-1].innerText = cellsState[i-1];
                    cells[i-10].innerText = cellsState[i-10];
                    cells[i-11].innerText = cellsState[i-11];
                    cells[i+10].innerText = cellsState[i+10];
                    cells[i+9].innerText = cellsState[i+9];
                }
            } else if (i > 90 && i < 99) {  //Bottom row not corner
                cells[i-1].innerText = cellsState[i-1];
                   cells[i+1].innerText = cellsState[i+1];
                    cells[i-10].innerText = cellsState[i-10];
                    cells[i-11].innerText = cellsState[i-11];
                    cells[i-9].innerText = cellsState[i-9];

            } else if (i > 0 && i < 9) {    //Top row not corner
                    cells[i-1].innerText = cellsState[i-1];
                   cells[i+1].innerText = cellsState[i+1];
                    cells[i+10].innerText = cellsState[i+10];
                    cells[i+11].innerText = cellsState[i+11];
                    cells[i+9].innerText = cellsState[i+9];

            } else {    //Any non-border pieces
                    cells[i-1].innerText = cellsState[i-1];
                   cells[i+1].innerText = cellsState[i+1];
                    cells[i+10].innerText = cellsState[i+10];
                    cells[i+11].innerText = cellsState[i+11];
                    cells[i+9].innerText = cellsState[i+9];
                    cells[i-10].innerText = cellsState[i-10];
                    cells[i-11].innerText = cellsState[i-11];
                    cells[i-9].innerText = cellsState[i-9];
            }
        }
        //cells[i].innerText = cellsState[i];
        cells[i].addEventListener('click', turnClick, false);   //Click listener
        cells[i].addEventListener('contextmenu', rightClick, false);
    }

    for (var i = 0; i < cells.length; i ++) {
        if (cells[i].innerText != ('')) {
            cells[i].style.background = 'ghostwhite';
        }
    }
}

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() {
        window.event.returnValue = false;
    });
}

function rightClick(square) {
    if (clicks == 0) {
        timer();
    }
    clicks++;
    var temp = square.target.id;
    if (cells[temp].innerText != 'M') {
        if (cells[temp].style.background == 'gainsboro') {
            cells[temp].style.color = 'black';
            cells[temp].innerText = 'M';

            let gameWon = checkWin();
            if (gameWon) gameOver(gameWon)  //If game has been won, call gameOver function
        }
    } else {
        cells[temp].innerText = '';
    }
}

function turnClick(square) { //Passes through click event, displays in log what number you clicked on.
    if (clicks == 0) {
        timer();
    }
    clicks++;
    var temp = square.target.id;
    if (cells[temp].innerText != 'M') {
        cells[temp].innerText = cellsState[temp];

        cells[temp].style.background = 'ghostwhite';

        switch (cellsState[temp]) {
                case 1:
                    cells[temp].style.color = 'blue';
                    break;
                case 2:
                    cells[temp].style.color = 'green';
                    break;
                case 3:
                    cells[temp].style.color = 'red';
                    break;
                case 4:
                    cells[temp].style.color = 'purple';
                    break;
                case 5:
                    cells[temp].style.color = 'brown';
                    break;
                case 6:
                    cells[temp].style.color = 'aquamarine';
                    break;
                case 7:
                    cells[temp].style.color = 'black';
                    break;
                case 8:
                    cells[temp].style.color = 'gray';
                    break;
            }

        if (cellsState[temp] == '*') {
            gameOver();
        } 
        let gameWon = checkWin();
        if (gameWon) gameOver(gameWon)  //If game has been won, call gameOver function
    }
}

function checkWin() {
    var allFill = true;
    for (var h = 0; h < cells.length; h ++) {
        if (cells[h].innerText == 'M' && cellsState[h] != '*') {
            allFill = false;
            break;
        }
        if (cells[h].style.background == 'gainsboro' && cells[h].innerText != 'M') {
            allFill = false;
            break;
        }

    }

    if (allFill == false)
        return false;
    return true;
}

function gameOver(gameWon) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
        cells[i].removeEventListener('contextmenu', rightClick, false);
    }
    if (gameWon == true) {
        declareWinner("You win!");
        clearTimeout(t);
        gameFinished = true;
    document.getElementById("").innerHTML = number;
    }
    else {
        declareWinner("You lose!");
        clearTimeout(t);
    }
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}
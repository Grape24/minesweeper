'use strict'
var BOMB = '💣';
var FLAG = '⛳';
var gClickCount = 0;
var gLivesCount = 0;
var SMILEY = '😊';
var SAD = '😖';
var SUNGLASSES = '😎';
var gMinMinutes = Infinity
var gMinSeconds = Infinity
var gBestScore = {};

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

var gBoard = [{
}]

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

function init(SIZE) {
    gBoard = buildBoard(SIZE, gLevel.MINES);
    renderBoard(gBoard, '.board-container');
}

function buildBoard(SIZE, MINES) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i].push([gBoard.cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                value: '',
            }])

        }
    }
    spreadMines(board, MINES);

    return board;
}


function levelClicked(elBtn) {
    if (elBtn.innerText === 'Level One') {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        init(gLevel.SIZE);
    }
    if (elBtn.innerText === 'Level Two') {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
        init(gLevel.SIZE);
    }
    if (elBtn.innerText === 'Level Three') {
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
        init(gLevel.SIZE);
    }

}


function restartGame(elDiv) {
    restartTime();
    init(gLevel.SIZE);
    elDiv.innerText = SMILEY;
    gClickCount = 0;
    document.querySelector('.win-modal').style.display = 'none';
    document.querySelector('.lives').innerText = '3 LIVES LEFT';


}

function checkVictory() {
    debugger
    var isShownCount = 0;
    var isMarkedCount = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j][0].isShown) {
                isShownCount++
            }
            if (gBoard[i][j][0].isMarked) {
                isMarkedCount++
            }
            if (gBoard[i][j][0].isMine && gBoard[i][j][0].isShown){
                return;
            }
        }
    } if (isShownCount === (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES &&
            isMarkedCount === gLevel.MINES) {
        document.querySelector('.smiley').innerText = SUNGLASSES;
        stopTime(t);
        document.querySelector('.win-modal').style.display = 'block';
        storeBestScore();

    }
}

function storeBestScore() {
    var score = {}
    var elTime = document.querySelector('.timer').innerText;
    var parts = elTime.split(':');
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].charAt(0) === '0') {
            parts[i] = parts[i].slice(0);
        }
    }
    score.minutes = +parts[0];
    score.seconds = +parts[1];
    minutes = score.minutes;
    seconds = score.seconds;
    if (seconds <= gMinSeconds && minutes <= gMinMinutes) {
        gMinMinutes = minutes;
        gMinSeconds = seconds;
        gBestScore.minutes = gMinMinutes;
        gBestScore.seconds = gMinSeconds;
    }
    document.querySelector('.max-time').innerText = `${gBestScore.minutes} minutes and ${gBestScore.seconds} seconds`
}










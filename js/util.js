
'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function renderBoard(mat, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var className = `cell-${i}-${j}`;
            if (mat[i][j][0].isMine) {
                className = `cell-${i}-${j} Mine`
            }
            strHTML += `<td onmousedown="cellMarked(event, this)" class="${className}"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
    var counter = 0;
    var elCell = document.querySelectorAll('td');
    while (counter < elCell.length) {
        for (var i = 0; i < mat.length; i++) {
            for (var j = 0; j < mat[0].length; j++) {
                var cellPosition = { i: i, j: j }
                var negs = checkMinesCount(cellPosition);
                var mineCount = markCells(negs);
                if (elCell[counter].className === `cell-${i}-${j} Mine`) {
                    gBoard[i][j][0].value = BOMB;
                } else gBoard[i][j][0].value = mineCount;
                gBoard[i][j][0].minesAroundCount = mineCount;
                counter++;
            }
        }
    }
    styleNumbers();
}

function getCellCoord(strCellClass) {
    var idx = {};
    var parts = strCellClass.split('-');
    idx.i = +parts[1]
    idx.j = +parts[2];
    return idx;
}

function getSelector(position) {
    return `.cell-${position.i}-${position.j}`
}

var elDiv = document.querySelectorAll('.timer')[0];
var seconds = 0;
var minutes = 0;
var t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
        }
    }

    elDiv.innerText = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

function restartTime() {
    clearTimeout(t);
    elDiv.innerText = '00:00';
    seconds = 0;
    minutes = 0;
}

function stopTime() {
    clearTimeout(t);
}












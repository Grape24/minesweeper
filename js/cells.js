'use strict'

function cellMarked(event, elCell) {
    var ev = event;

    if (gClickCount === 0) {
        timer();
        gGame.isOn = true;
    }
    if (ev.button === 0) {
        if (elCell.classList.contains('Mine') && gLivesCount < 3) {
            elCell.innerText = BOMB;
            elCell.classList.remove('Mine');
            var cellIdx = getCellCoord(elCell.className);
            gBoard[cellIdx.i][cellIdx.j][0].isShown = true;
            elCell.classList.add('Mine');

            gLivesCount++
            if (gLivesCount === 1) {
                document.querySelector('.lives').innerText = '2 LIVES LEFT'
                elCell.classList.remove('Mine');
                cellIdx = getCellCoord(elCell.className);
                gBoard[cellIdx.i][cellIdx.j][0].isShown = true;
                elCell.classList.add('Mine');
            }
            if (gLivesCount === 2) {
                document.querySelector('.lives').innerText = '1 LIFE LEFT'
                elCell.classList.remove('Mine');
                cellIdx = getCellCoord(elCell.className);
                gBoard[cellIdx.i][cellIdx.j][0].isShown = true;
                elCell.classList.add('Mine');
            }
            if (elCell.classList.contains('Mine') && gLivesCount === 3) {
                document.querySelector('.lives').innerText = 'GAME OVER';
                var elMines = document.querySelectorAll('.Mine');
                for (var i = 0; i < elMines.length; i++) {
                    elMines[i].innerText = BOMB;
                    elMines[i].classList.remove('Mine');
                    var minesIdx = getCellCoord(elMines[i].className);
                    gBoard[minesIdx.i][minesIdx.j][0].isShown = true;
                }
                stopTime(t);
                gGame.isOn = false;
                document.querySelector('.smiley').innerText = SAD;
                var elSafeCell = document.querySelector('.safe-click');
                elSafeCell.dataset.click = 0;
                elSafeCell.innerText = 'You have 3 safe clicks';
                gLivesCount = 0;
            }
        } else {
            if (!gGame.isOn) return;
            var cellPosition = getCellCoord(elCell.className);
            var mineCountIdx = getCellCoord(elCell.className);
            var negs = checkMinesCount(cellPosition);
            var mineCount = markCells(negs);
            gBoard[mineCountIdx.i][mineCountIdx.j][0].isShown = true;
            if (gBoard[mineCountIdx.i][mineCountIdx.j][0].value > 0) {
                elCell.innerText = mineCount;
            }
            if (gBoard[mineCountIdx.i][mineCountIdx.j][0].value === 0) {
                for (var i = 0; i < negs.length; i++) {
                    var elNegs = document.querySelector(getSelector(negs[i]));
                    var negPosition = getCellCoord(elNegs.className);
                    gBoard[negPosition.i][negPosition.j][0].isShown = true;
                    elNegs.innerText = gBoard[negPosition.i][negPosition.j][0].value

                }
            }
        }
    }

    if (ev.button === 2) {
        if (!gGame.isOn) return;
        elCell.classList.remove('Mine');
        var flagIdx = getCellCoord(elCell.className);
        if (elCell.innerText === FLAG) {
            elCell.innerText = '';
            gBoard[flagIdx.i][flagIdx.j][0].isMarked = false;
        } else {
            elCell.innerText = FLAG;
            gBoard[flagIdx.i][flagIdx.j][0].isShown = false;
            gBoard[flagIdx.i][flagIdx.j][0].isMarked = true;
        }
    }
    gClickCount++
    styleNumbers();
    checkVictory();
}


function markCells(positions) {
    var mineCount = 0;
    for (var i = 0; i < positions.length; i++) {
        if (positions === BOMB) {
            return BOMB;
        }
        var cellIdx = positions[i];
        if (gBoard[cellIdx.i][cellIdx.j][0].isMine) {
            mineCount++
        }
    } return mineCount;
}



function styleNumbers() {
    var elCell = document.querySelectorAll('td');
    for (var i = 0; i < elCell.length; i++) {
        if (elCell[i].innerText === '0') {
            elCell[i].style.color = '#a7a6a6';
            elCell[i].style.border = 'none';
        }
        if (elCell[i].innerText === '1') {
            elCell[i].style.color = 'Blue';
        }
        if (elCell[i].innerText === '2') {
            elCell[i].style.color = 'Green';
        }
        if (elCell[i].innerText === '3') {
            elCell[i].style.color = 'Red';
        }
        if (elCell[i].innerText === '4') {
            elCell[i].style.color = '#09007b';
        }
        if (elCell[i].innerText === '5') {
            elCell[i].style.color = 'Yellow';
        }
    }
}

function safeClick(elCell) {
    if (!gGame.isOn) return;
    if (elCell.dataset.click < 3) {
        safeCell();
        elCell.dataset.click++
        if (elCell.dataset.click === '1') {
            elCell.innerText = 'You have 2 safe clicks';
        }
        if (elCell.dataset.click === '2') {
            elCell.innerText = 'You have 1 safe click';
        }
        if (elCell.dataset.click === '3') {
            elCell.innerText = 'You ran out of safe clicks';
            return;
        }
    }

}

function safeCell() {
    var safeCells = []
    var elCells = document.querySelectorAll('td');
    for (var i = 0; i < elCells.length; i++) {
        if (!elCells[i].classList.contains('Mine') && elCells[i].innerHTML === "") {
            safeCells.push(elCells[i]);
        }
    }
    var safeCellIdx = getRandomIntInclusive(0, safeCells.length - 1);
    var elSafeCell = safeCells[safeCellIdx];
    var cellCoord = getCellCoord(elSafeCell.className);
    elSafeCell.innerText = gBoard[cellCoord.i][cellCoord.j][0].value;
    styleNumbers();
    elSafeCell.style.backgroundColor = 'white';
    function hideSafeCell() {
        elSafeCell.innerText = '';
        elSafeCell.style.backgroundColor = '#a7a6a6';
        elSafeCell.style.border = 'outset 5px rgb(196, 190, 190)'
    }
    setTimeout(hideSafeCell, 1000);
}


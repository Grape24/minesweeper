'use strict'

function checkMinesCount(cellPosition, elCell) {
    var res = [];
    var elCell = document.querySelector(getSelector(cellPosition));
    if (elCell.className === `cell-${cellPosition.i}-${cellPosition.j} Mine`) return BOMB;
    for (var i = cellPosition.i - 1; i <= cellPosition.i + 1; i++) {
        for (var j = cellPosition.j - 1; j <= cellPosition.j + 1; j++) {
            var position = { i: i, j: j };
            if (j < 0 || j > gLevel.SIZE - 1 || i < 0 || i > gLevel.SIZE - 1) continue;
            //if (i === cellPosition.i && j === cellPosition.j) continue;
            res.push(position);
        }

    } return res;

}

function spreadMines(board, MINES) {
    var minesLocations = []
    var minesIdx;
    for (var i = 0; i < MINES; i++) {
        var newMinesIdx;
        var randIdxI = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var randIdxJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var mine = board[randIdxI][randIdxJ];
        newMinesIdx = randIdxI + ' ,' + randIdxJ;
        while (minesLocations.includes(newMinesIdx)) {
            var randIdxI = getRandomIntInclusive(0, gLevel.SIZE - 1)
            var randIdxJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
            var mine = board[randIdxI][randIdxJ];
            newMinesIdx = randIdxI + ' ,' + randIdxJ;
        }
        mine[0].isMine = true;
        if (mine[0].isMine) {
            mine[0].value = BOMB;
        }
        minesIdx = randIdxI + ' ,' + randIdxJ;
        minesLocations.push(minesIdx);
    }
}


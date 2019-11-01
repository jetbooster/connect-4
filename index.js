const listener = require('listener');
const { findHorizontalThree, findVerticalThree, findDecendingDiagonal, findAscendingDiagonal } = require('detector');
const { receiveMove, sendMove } = require('brain');

let board;

const start = () => {
    const server = listener.listen()

    board = initialiseBoard();
}

function initialiseBoard() {
    return new Array(6).fill(new Array(7).fill(0));
}
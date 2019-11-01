const listener = require('listener');
const { findHorizontalThree, findVerticalThree, findDecendingDiagonal, findAscendingDiagonal } = require('detector');
const { receiveMove, sendMove } = require('brain');

const start = () => {
    const server = listener.listen()

    
}
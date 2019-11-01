const listener = require('./listener');
//const { findHorizontalThree, findVerticalThree, findDecendingDiagonal, findAscendingDiagonal } = require('detector');
//const { receiveMove, sendMove } = require('brain');

let board;

const start = () => {
    const server = listener.listen()
    server.on('connection',(socket)=>{
        socket.on('data',(data)=>{
            const message = data.toString()
            console.log(data.toString())
            if(!message.includes('HELLO=0') || !message.includes('END') || message.includes('VALID')){
                console.log('sending &MOVE=1;')
                socket.write('&MOVE=1;')
            };
        })
        socket.on('end',()=>{
            console.log('disconnected')
        })
    });
    board = initialiseBoard();
}

start()

function initialiseBoard() {
    let newBoard = new Array(7);
    for (let i = 0; i < newBoard.length; i++) {
        newBoard[i] = new Array(6).fill(0);
    }
    return newBoard;
}

function updateBoard(column, player) {
    let index = board[column].indexOf(0);
    board[column][index] = player;
}
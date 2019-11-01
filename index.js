const listener = require('./listener');
const { detectVertical } = require('./detector');
//const { receiveMove, sendMove } = require('brain');

let board;
let nextMove;

const start = () => {
    const server = listener.listen()
    board = initialiseBoard();
    server.on('connection',(socket)=>{
        console.log('New Connection')
        socket.on('data',(data)=>{
            const message = data.toString()
            console.log(data.toString());
            if (message.includes('&VALID=1;')) {
                updateBoard(nextMove, 1);
            }
            if(message === '&HELLO=0;'){
                socket.write('&HELLO=0;');
            }
            if(message === ('&HELLO=1;')){
                let playerMove = 1;
                console.log(`sending &MOVE=${playerMove};`);
                nextMove = playerMove; // Needs updating to actual move
                socket.write(`&MOVE=${playerMove};`);
            }
            if( message.includes('MOVE')){
                let column = message.match(/&MOVE=(\d);/)[1];
                updateBoard(column, 2);
                let playerMove = 1;
                console.log(detectVertical(board));
                console.log(`sending &MOVE=${playerMove};`);
                nextMove = playerMove; // Needs updating to actual move
                socket.write(`&MOVE=${playerMove};`);
            };
        })
        socket.on('end',()=>{
            console.log('disconnected')
        })
    });
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
    console.log(board)
}
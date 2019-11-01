const listener = require('./listener');
const { detectVertical, detectHorizontal } = require('./detector');
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
                console.log(board)
            }
            if(message.includes('END')){
                return;
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
                let playerMove = chooseMove();
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
    if (index === -1){
        return;
    }
    board[column][index] = player;
}

function chooseMove() {
    let column = detectVertical(board);
    console.log(detectHorizontal(board));
    console.log(column)
    if (column !== -1) {
        return column;
    }
    // This will check whether a column is full. If not, it will play that column
    for (let i = 0; i < board.length; i++) {
        if (board[i][5] === 0) {
            column = i;
            break;
        }
    }
    return column;
}
const listener = require('./listener');
const { detectVertical, detectHorizontal } = require('./detector');
//const { receiveMove, sendMove } = require('brain');

let board;
let nextMove;

const start = () => {
    const server = listener.listen()
    server.on('connection',(socket)=>{
        board = initialiseBoard();
        console.log('New Connection')
        socket.on('data',(data)=>{
            const message = data.toString()
            console.log(data.toString());
            if (message.includes('&valid=1;')) {
                updateBoard(nextMove, 1);
            }
            if(message.includes('end')){
                return;
            }
            if(message === '&hello=0;'){
                socket.write('&hello=0;');
            }
            if(message === ('&hello=1;')){
                let playerMove = 1;
                console.log(`sending &move=${playerMove};`);
                nextMove = playerMove; // Needs updating to actual move
                socket.write(`&move=${playerMove};`);
            }
            if( message.includes('move')){
                let column = message.match(/&move=(\d);/)[1];
                updateBoard(column, 2);
                let playerMove = chooseMove();
                console.log(`sending &move=${playerMove};`);
                nextMove = playerMove; // Needs updating to actual move
                socket.write(`&move=${playerMove};`);
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
    console.log(board)
    let column = detectVertical(board);
    console.log(detectHorizontal(board));
    console.log(column)
    if (column !== -1) {
        return column;
    }
    // This will check whether a column is full, starting from the middle. If not, it will play that column
    const columnOrder = [3, 2, 4, 1, 5, 0, 6];
    for (col of columnOrder) {
        if (board[col][5] === 0) {
            column = col;
            break;
        }
    };
    return column;
}
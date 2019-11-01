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
    return new Array(6).fill(new Array(7).fill(0));
}

function updateBoard() {
    
}
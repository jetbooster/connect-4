const detectDiagonal = (board) => {
    const numColumns = 7;
    let move = -1;
    for (let column = 0; column < numColumns; column++) {
        let row = board[column].indexOf(0);
        if (checkLowerLeft(column, row, 1)) {
            move = column;
        } else if (checkLowerLeft(column, row, 2)) {
            move = column;
        }
    }
    return move;

    function checkLowerLeft(column, row, colour, count = 0) {
        let newColumn = column - 1;
        let newRow = row - 1;
        if (newColumn >= 0 && newRow >= 0) {
            if (board[newColumn][newRow] === colour) {
                if (count === 2) {
                    return colour;
                } else {
                    return checkLowerLeft(newColumn, newRow, colour, count + 1);
                }
            } else {
                return false;
            }
        }
        return false;
    }
}

const detectHorizontal = (board) => {
    const x = board.map((col, i) => board.map(row => row[i]));
    return x.slice(0,6)
}

const detectVertical = (board) => {
    // for each row, check for 3 of the same number in a row, followed by an empty space
    let move;
    let result;
    board.forEach((column, index)=>{
        result = check(column,index, move)
    });
    if (move){
        return move.column;
    }
    return -1
}

const check = (col,index, move) =>{
    let num = 0;
    let colour = undefined;
    let prevSpace = undefined;
    col.forEach((space)=>{

        if(num === 3 && space === 0){
            // chain of 3 detected and a blank space
            colour = prevSpace === 1 ? 'us' : 'them'
            if(move && move.colour === 'them' && colour === 'us' ){
                // this move is better as it ends the game for us
                // rather than just blocking them
                move = { player: colour, column:index }
            } else {
                move = { player: colour, column:index }
            }
            return;
        }
        if (space === 0){
            // have reached a 0 without reaching 3 in a row. Stop.
            return;
        }
        if (prevSpace === undefined || space === prevSpace){
            // prev was blank, or the same as previous. add 1 to num
            num +=1;
        } else {
            // colours did not match, this is a new chain

            num = 1;
        }
        prevSpace = space;
        return;
    });
    return move;
}

module.exports = {
    detectVertical,
    detectHorizontal,
    detectDiagonal
}
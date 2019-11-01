const check3 = (array)=> {
    let moveAt = [];
    moveToLeft =  array.some(function (a, i, aa) {
        runOfThree = (i > 1 && a === aa[i - 2] && a === aa[i - 1] && aa[i-3] === 0);
        if(runOfThree){
            moveAt.push(i-3)
            return true 
        }
        return false;
    });
    moveToRight = array.some(function (a, i, aa) {
        runOfThree =  i > 1 && a === aa[i - 2] && a === aa[i - 1] && aa[i+1] === 0;
        if(runOfThree){
            moveAt.push(i+1)
            return true 
        }
        return false;
    });
    return moveAt;
}

const detectHorizontal = (board) => {
    move = -1;
    const transposed = board.map((col, i) => board.map(row => row[i])).slice(0,6);
    transposed.forEach((row, index)=>{
        columnsToTry = check3(row);
        if (!columnsToTry.length === 0){
            columnsToTry.forEach((col)=>{
                if (board[columnToTry].indexOf(0)===index){
                    // First 0 found is the same as the height of this row, so this move is valid
                    move = col;
                }
            })
        }
    })
    return move;
}

const detectVertical = (board) => {
    // for each row, check for 3 of the same number in a row, followed by an empty space
    let bestResult;
    board.forEach((column, index)=>{
        const result = check(column,index)
        if (bestResult && !bestResult.colour === 'us'){
            if (result.colour === 'us'){
                bestResult = result
            }
        } else if(result) {
            bestResult = result;
        }
    });
    if (bestResult){
        return bestResult.column;
    }
    return -1
}

const check = (col,index) =>{
    let move;
    let num = 0;
    let colour = undefined;
    let prevSpace = undefined;
    col.forEach((space)=>{

        if(num === 3 && space === 0){
            console.log('three in a row detected')
            // chain of 3 detected and a blank space
            colour = prevSpace === 1 ? 'us' : 'them'
            move = { player: colour, column:index }
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
    detectHorizontal
}
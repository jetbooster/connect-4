const detectHorizontal = (board, ) => {

}

const detectVertical = (board) => {
    // for each row, check for 3 of the same number in a row, followed by an empty space
    columToMoveIn = undefined;
    board.forEach((column, index)=>{
        let num = 0;
        let prevSpace = undefined;
        let move;
        column.forEach(space,()=>{
            if(num===3 && space === 0){
                // chain of 3 detected and a blank space
                // doesn't matter if it's ours or theirs, we need to move there.
                move = true;
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
        })
        if (move)
    })
}
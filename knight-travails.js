function knightMoves(start, end) {

    // Validate user input
    if(!evalInput(start) || !evalInput(end)){
        return;
    } 

    // Set > An object that holds unique values
    // In here we will input each field that we have visited thus
    // Removing possiblity of visition the same field multiple times
    const visited = new Set([start.toString()]);
    let foundPaths = [];
    let path = [start];
    let queue = [{field: start, path: path}];
    const moves = [
        [2,-1],[2,1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]
    ];

    // Start queue traversal
    while(queue.length > 0){
        let current = queue.shift();

        // Evaluate if the field we are currently at the field we are looking for
        // If true return the path we used to get there & break the method
        if (current.field[0] === end[0] && current.field[1] === end[1]){
            console.log(current.path);
            foundPaths.push(current.path);
        }

        // For each possible move calculate the next move
        // If the move is valid add it to queue and mark it as visited, if not return
        moves.forEach(move => {

            // Next move calculation
            currentField = [current.field[0] + move[0], current.field[1] + move[1]];

            // If move is valid and has not yet been visited
            // Mark it as visited and add it to the queue
            if(evalInput(currentField) && !visited.has(currentField.toString())){
                visited.add(currentField.toString());
                queue.push({field: currentField, path: [...current.path, currentField]});
            } else{
                return;
            }
        });
    } 
    console.log(foundPaths);    
}

// Method for evaluating the validity of input
function evalInput(fieldArr){
    if (!Array.isArray(fieldArr)){
        return false;
    }
    if ((fieldArr[0] > 7 || fieldArr[1] > 7) || (fieldArr[0] < 0 || fieldArr[1] < 0)){
        return false;
    }

    return true;
}

knightMoves([0,0],[7,7]);
knightMoves([0,0],[3,3]);
knightMoves([3,3],[0,0]);



const LENGTH = 4;

export function isConnect4(data, pos) {
    if (pos.length == 2) {
        const r = pos[0];
        const c = pos[1];
    //    if (r < numRows && c < numCols) {
            return isColumnConnect(data, r, c) || isRowConnect(data, r, c) || isDiagConnect(data, r, c);                     
      //  }
    }

    return false;
}

function isColumnConnect(data, row, col) {
    let arr = data.slice(row, row + LENGTH).map(elem => elem[col]);
    return isArrayConnect(arr, data[row][col]);
}

function isRowConnect(data, row, col) {
    const arr = data[row].slice(Math.max(0, col - LENGTH - 1), Math.min(data[row].length, col + LENGTH));
    return isArrayConnect(arr, data[row][col]);
}

function isDiagConnect(data, row, col) {
    return isDiagonalConnect1(data, row, col) || isDiagonalConnect2(data, row, col);
}

function isDiagonalConnect1(data, row, col) {
    let i = row - LENGTH + 1, 
        j = col - LENGTH + 1;
    let count = 1;
    let arr = [];
    let coord = [];
    while (count < (2 * LENGTH) && i < data.length && j < data[i].length) {
        if (data[i] != undefined && data[i][j] != undefined) {
            arr.push(data[i][j]);
        }
        i++;
        j++;
        count++;
    }
    return isArrayConnect(arr, data[row][col]);
}

function isDiagonalConnect2(data, row, col) {
    const beginRow = row - LENGTH + 1,
          beginCol = col + LENGTH - 1,
          endRow = row + LENGTH, 
          endCol = col - LENGTH;
    
    let arr = [];
    let coord = [];
    for (let i = beginRow, j = beginCol; i < endRow && j > endCol; i++, j--) {
        if (data[i] != undefined && data[i][j] != undefined) {
            arr.push(data[i][j]);
        }
        coord.push(`${i},${j}`);
    }
//  console.log(coord)
    return isArrayConnect(arr, data[row][col]);
}

function isArrayConnect(arr, val) {
    let connected = false;
    for (let i = 0; i <= arr.length - LENGTH; i++) {
        connected = arr.slice(i, i + LENGTH).every(elem => elem === val);
        if (connected) {
            break;
        }
    }

    return connected;
}
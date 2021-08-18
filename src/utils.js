import { NUM_ROWS, NUM_COLS, CONNECT_SIZE } from './constants';

export function isConnect4(data, pos) {
    if (pos.length === 2) {
        const rowIndex = pos[0];
        const colIndex = pos[1];
        if (rowIndex < NUM_ROWS && colIndex < NUM_COLS) {
            return isColumnConnect(data, rowIndex, colIndex) || 
                    isRowConnect(data, rowIndex, colIndex) || 
                    isDiagonalConnect(data, rowIndex, colIndex);
        }
    }

    return false;
}

function isColumnConnect(data, rowIndex, colIndex) {
    const arr = data.slice(rowIndex, rowIndex + CONNECT_SIZE).map(elem => elem[colIndex]);
    return isArrayConnect(arr, data[rowIndex][colIndex]);
}

function isRowConnect(data, rowIndex, colIndex) {
    const arr = data[rowIndex].slice(Math.max(0, colIndex - CONNECT_SIZE - 1), Math.min(data[rowIndex].length, colIndex + CONNECT_SIZE));
    return isArrayConnect(arr, data[rowIndex][colIndex]);
}

function isDiagonalConnect(data, rowIndex, colIndex) {
    return isDiagonalConnect1(data, rowIndex, colIndex) || 
            isDiagonalConnect2(data, rowIndex, colIndex);
}

function isDiagonalConnect1(data, rowIndex, colIndex) {
    const maxSize = 2 * CONNECT_SIZE;
    let i = rowIndex - CONNECT_SIZE + 1, 
        j = colIndex - CONNECT_SIZE + 1,
        count = 1,
        arr = [];

    while (count < maxSize && i < data.length && j < data[0].length) {
        if (data[i] !== undefined && data[i][j] !== undefined) {
            arr.push(data[i][j]);
        }
        i++;
        j++;
        count++;
    }

    return isArrayConnect(arr, data[rowIndex][colIndex]);
}

function isDiagonalConnect2(data, rowIndex, colIndex) {
    const maxSize = 2 * CONNECT_SIZE;
    let i = rowIndex - CONNECT_SIZE + 1, 
        j = colIndex + CONNECT_SIZE - 1,
        count = 1,
        arr = [];
    
    let coord = [];
    while (count < maxSize && i < data.length && j >= 0) {
        if (data[i] !== undefined && data[i][j] !== undefined) {
            arr.push(data[i][j]);
        }
        coord.push(`${i},${j}`);
        i++;
        j--;
        count++;
    }
 //   console.log(coord)
    return isArrayConnect(arr, data[rowIndex][colIndex]);
}

function isArrayConnect(arr, val) {
    let connected = false;
    for (let i = 0; i <= arr.length - CONNECT_SIZE; i++) {
        connected = arr.slice(i, i + CONNECT_SIZE).every(elem => elem === val);
        if (connected) {
            break;
        }
    }

    return connected;
}
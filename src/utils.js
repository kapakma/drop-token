import { NUM_ROWS, NUM_COLS, CONNECT_SIZE } from './constants';

export function isConnect4(data, position) {
    if (position.length === 2) {
        const [rowIndex, colIndex] = position;
        if (rowIndex < NUM_ROWS && colIndex < NUM_COLS) {
            return isColumnConnect(data, rowIndex, colIndex) || isRowConnect(data, rowIndex, colIndex) || 
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
    const arr = data[rowIndex].slice(Math.max(0, colIndex - CONNECT_SIZE + 1), Math.min(data[rowIndex].length, colIndex + CONNECT_SIZE));
    return isArrayConnect(arr, data[rowIndex][colIndex]);
}

function isDiagonalConnect(data, rowIndex, colIndex) {
    return isDiagonalConnect1(data, rowIndex, colIndex) || isDiagonalConnect2(data, rowIndex, colIndex);
}

function isDiagonalConnect1(data, rowIndex, colIndex) {
    const val = data[rowIndex][colIndex];
    let count = 1;

    for (let i = rowIndex-1, j = colIndex-1; 
            count < CONNECT_SIZE && i >= 0 && j >= 0; 
            i--, j--) {
        if (data[i][j] !== val) {
            break;
        }
        count++;
    }

    for (let i = rowIndex+1, j = colIndex+1; 
            count < CONNECT_SIZE && i < NUM_ROWS && j < NUM_COLS; 
            i++, j++) {
        if (data[i][j] !== val) {
            break;
        }
        count++;
    }

    return (count === CONNECT_SIZE);
}

function isDiagonalConnect2(data, rowIndex, colIndex) {
    const val = data[rowIndex][colIndex];
    let count = 1;

    for (let i = rowIndex-1, j = colIndex+1; 
            count < CONNECT_SIZE && i >= 0 && j < NUM_COLS; 
            i--, j++) {
        if (data[i][j] !== val) {
            break;
        }
        count++;
    }

    for (let i = rowIndex+1, j = colIndex-1; 
            count < CONNECT_SIZE && i < NUM_ROWS && j >= 0; 
            i++, j--) {
        if (data[i][j] !== val) {
            break;
        }
        count++;
    }

    return (count === CONNECT_SIZE);
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
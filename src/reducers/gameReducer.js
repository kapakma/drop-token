import { NUM_ROWS, NUM_COLS, BOARD_SIZE } from '../constants';
import { isConnect4 } from '../utils';

export const actionTypes = {
    startGame: 'START_GAME',
    resetGame: 'RESET_GAME',
    dropToken: 'DROP_TOKEN',
};

export const initialState = {
    gameStart: false,
    currentPlayer: 0,
    winner: -1,
    moves: [],
    board: Array(NUM_ROWS).fill(Array(NUM_COLS).fill(0))
};

export function reducer(state, action) {
    switch(action.type) {
        case actionTypes.dropToken:
            let rowIndex = state.board.slice().reverse().findIndex(row => 
                    row[action.columnIndex] === 0
                );
            
            if (rowIndex === -1) {
                return state;
            }

            rowIndex = (state.board.length - 1 - rowIndex);
            
            const newRow = [
                ...state.board[rowIndex].slice(0, action.columnIndex),
                state.currentPlayer,
                ...state.board[rowIndex].slice(action.columnIndex + 1)
            ];

            const newBoard = [
                ...state.board.slice(0, rowIndex),
                newRow,
                ...state.board.slice(rowIndex + 1)
            ];

            const moves = [
                ...state.moves, 
                action.columnIndex
            ];

            const connect4 = isConnect4(newBoard, [rowIndex, action.columnIndex]);
            
            const winner = (connect4 ? state.currentPlayer : moves.length === BOARD_SIZE ? 0 : -1);

            return {
                ...state,
                moves: moves,
                board: newBoard,
                winner: winner,
                currentPlayer: (winner > -1) ? 0 : (state.currentPlayer === 1 ? 2 : 1)
            };
        case actionTypes.startGame: 
            return {
                ...state,
                gameStart: true,
                currentPlayer: action.firstPlayer
            };
        case actionTypes.resetGame:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
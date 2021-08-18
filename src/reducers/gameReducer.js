import { NUM_ROWS, NUM_COLS, BOARD_SIZE } from '../constants';
import { isConnect4 } from '../utils';

export const actionTypes = {
    startGame: 'START_GAME',
    resetGame: 'RESET_GAME',
    dropToken: 'DROP_TOKEN',
    checkWinner: 'CHECK_WINNER',
};

export const initialState = {
    gameStart: false,
    currentPlayer: 0,
    winner: -1,
    moves: [],
    lastPosition: [],
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

            return {
                ...state,
                lastPosition: [rowIndex, action.columnIndex],
                moves: [
                    ...state.moves, 
                    action.columnIndex
                ],
                board: [
                    ...state.board.slice(0, rowIndex),
                    newRow,
                    ...state.board.slice(rowIndex + 1)
                ]
            };
        case actionTypes.checkWinner:
            const connect4 = isConnect4(state.board, state.lastPosition);
            const user = connect4 ? state.currentPlayer : (state.currentPlayer === 1 ? 2 : 1);

            return {
                ...state,
                winner: connect4 ? state.currentPlayer : (state.moves.length === BOARD_SIZE ? 0 : -1),
                currentPlayer: user,
            };
        case actionTypes.startGame: 
            return {
                ...initialState,
                currentPlayer: action.firstPlayer,
                gameStart: true
            };
        case actionTypes.resetGame:
            return {
                ...initialState
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}
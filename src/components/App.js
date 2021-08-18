import './App.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { isConnect4 } from '../utils';
import Board from './Board';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';

const serviceUrl = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production';
const numRows = 4;
const numCols = 4;
const boardSize = numRows * numCols;

const initialState = {
    gameStart: false,
    currentPlayer: 0,
    winner: -1,
    moves: [],
    lastPosition: [],
    board: Array(numRows).fill(Array(numCols).fill(0))
};

const actionTypes = {
    startGame: 'START_GAME',
    resetGame: 'RESET_GAME',
    dropToken: 'DROP_TOKEN',
    checkWinner: 'CHECK_WINNER',
};

function gameReducer(state, action) {
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
                winner: connect4 ? state.currentPlayer : (state.moves.length === boardSize ? 0 : -1),
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

function App() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    function handleStartGame(player) {
        dispatch({
            type: actionTypes.startGame,
            firstPlayer: player
        });
    }

    function handleResetGame() {
        dispatch({
            type: actionTypes.resetGame
        });
    }

    function handleDropToken(columnIndex) {
        dispatch({
            type: actionTypes.dropToken,
            columnIndex: columnIndex
        });
    }

    useEffect(() => {
        dispatch({
            type: actionTypes.checkWinner
        });
    }, [state.board]);

    useEffect(() => {
        if (state.currentPlayer === 2) {
            axios.get(`${serviceUrl}?moves=[${state.moves.join(',')}]`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        const columnIndex = response.data[response.data.length - 1];
                        dispatch({
                            type: actionTypes.dropToken,
                            columnIndex: columnIndex
                        });
                    }
                })
                .catch(error => console.log(error));
        }
    }, [state.currentPlayer]);

    return (
        <div className="App">
            <div className="screen">
                <Board numRows={numRows} numCols={numCols} data={state.board} onDropToken={handleDropToken} />
                {
                    !state.gameStart && <StartScreen onStartGame={handleStartGame} />
                }
                {
                    state.winner !== -1 && <GameOverScreen winner={state.winner} onResetGame={handleResetGame} />
                }
            </div>
        </div>
    );
}

export default App;
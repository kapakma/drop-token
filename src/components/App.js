import './App.css';
import { useReducer, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import { isConnect4 } from '../utils';
import Board from './Board';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';

const numRows = 4;//6;
const numCols = 4;//7;
const boardSize = numRows * numCols;

const initialState = {
    gameStart: false,
    currentPlayer: 0,
    winner: -1,
    moves: [],
    lastPosition: [],    
    board: Array(numRows).fill(Array(numCols).fill(0))
}

function reducer(state, action) {
    switch(action.type) {
        case 'DROP_TOKEN':
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
                moves: [...state.moves, action.columnIndex],
                board: [
                    ...state.board.slice(0, rowIndex),
                    newRow,
                    ...state.board.slice(rowIndex + 1)
                ]
            };

        case 'CHECK_WINNER':
            const connect4 = isConnect4(state.board, state.lastPosition);
            const user = connect4 ? state.currentPlayer : (state.currentPlayer === 1 ? 2 : 1);

            return {
                ...state,
                winner: connect4 ? state.currentPlayer : (state.moves.length === boardSize ? 0 : -1),
                currentPlayer: user,
            };
        case 'START_GAME': 
            return {
                ...initialState,
                currentPlayer: action.firstPlayer,
                gameStart: true
            };
        case 'RESET_GAME':
            return {
                ...initialState
            };
        default:
            return state;
    }
}

function sendMoveRequest() {
    /*
    axios.get('https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[0,0,3,2,3]', {
            
        })
        .then(res => {
            const data = res.data;
            console.log(res.data);
        })
        .catch(error => {
            console.log(error);
        });
   */
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleStartGame(player) {
        dispatch({
            type: 'START_GAME',
            firstPlayer: player
        });
    }

    function handleResetGame() {
        dispatch({
            type: 'RESET_GAME'
        });
    }

    function handleDropToken(columnIndex) {
        dispatch({
            type: 'DROP_TOKEN',
            columnIndex: columnIndex
        });
        sendMoveRequest();
    }

    useEffect(() => {
        dispatch({
            type: 'CHECK_WINNER'
        });
    }, [state.board]);

    useEffect(() => {
        dispatch({
            type: 'RESET_GAME'
        });
    }, []);

    return (
        <div className="App">
            <div className="screen">
                <Board numRows={numRows} numCols={numCols} data={state.board} dropToken={handleDropToken} />
                {
                    !state.gameStart && <StartScreen onStartGame={handleStartGame} />
                }
                {
                    state.winner > -1 && <GameOverScreen winner={state.winner} onResetGame={handleResetGame} />
                }
            </div>
        </div>
    );
}

export default App;
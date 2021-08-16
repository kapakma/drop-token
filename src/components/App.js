import './App.css';
import { useReducer, useEffect } from 'react';
import { isConnect4 } from '../utils';
import Board from './Board';
import Overlay from './Overlay';
import Console from './Console';

const numRows = 6;
const numCols = 7;
const boardSize = numRows * numCols;

const initialState = {
    winner: 0,
    currentUser: 1,    
    lastMove: [],
    numMoves: 0,
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
                state.currentUser,
                ...state.board[rowIndex].slice(action.columnIndex + 1)
            ];

            return {
                ...state,                
                lastMove: [rowIndex, action.columnIndex],
                numMoves: state.numMoves + 1,
                board: [
                    ...state.board.slice(0, rowIndex),
                    newRow,
                    ...state.board.slice(rowIndex + 1)
                ]
            };

        case 'CHECK_WINNER':
            const connect4 = isConnect4(state.board, state.lastMove);
            const user = !connect4 ? (state.currentUser === 1 ? 2 : 1) : state.currentUser;

            return {
                ...state,
                winner: connect4 ? state.currentUser : (state.numMoves === boardSize ? 3 : 0),
                currentUser: user
            };

        case 'RESET_GAME': 
            return initialState;
   
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function dropToken(colIndex) {
        dispatch({
            type: 'DROP_TOKEN',
            columnIndex: colIndex
        });
    }

    function resetGame() {
        dispatch({
            type: 'RESET_GAME'
        })
    }

    useEffect(() => {
        dispatch({
            type: 'CHECK_WINNER'
        });
    }, [state.board]);

    return (
        <div className="App">
            <div className="screen">
                <Board numRows={numRows} numCols={numCols} dropToken={dropToken} data={state.board} />
                {
                    state.winner > 0 ? <Overlay status={state.winner} resetGame={resetGame}/> : <></>
                }
            </div>
            <Console user={state.currentUser} />
        </div>
    );
}

export default App;
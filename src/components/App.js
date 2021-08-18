import './App.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { gameReducer, initialState, actionTypes } from '../reducers/gameReducer';
import Board from './Board';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';

const serviceUrl = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production';
const numRows = 4;
const numCols = 4;

function App() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    function handleStart(player) {
        dispatch({
            type: actionTypes.startGame,
            firstPlayer: player
        });
    }

    function handleReset() {
        dispatch({
            type: actionTypes.resetGame
        });
    }

    function handleTokenDrop(columnIndex) {
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
                <Board numRows={numRows} numCols={numCols} data={state.board} onTokenDrop={handleTokenDrop} />
                {
                    !state.gameStart && <StartScreen onStart={handleStart} />
                }
                {
                    state.winner !== -1 && <GameOverScreen winner={state.winner} onReset={handleReset} />
                }
            </div>
        </div>
    );
}

export default App;
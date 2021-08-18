import './App.css';
import axios from 'axios';
import { useState, useReducer, useEffect } from 'react';
import { SERVICE_URL, NUM_ROWS, NUM_COLS } from '../constants';
import { reducer, initialState, actionTypes } from '../reducers/gameReducer';
import Board from './Board';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';
import LoadingScreen from './LoadingScreen';

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            axios.get(`${SERVICE_URL}?moves=[${state.moves.join(',')}]`)
                .then(response => {
                    setLoading(false);
                    if (response.data && response.data.length) {
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
                <Board numRows={NUM_ROWS} numCols={NUM_COLS} data={state.board} onTokenDrop={handleTokenDrop} />
                {
                    loading && <LoadingScreen />
                }
                {
                    !state.gameStart && <StartScreen onStart={handleStart} />
                }
                {
                    state.winner > -1 && <GameOverScreen winner={state.winner} onReset={handleReset} />
                }
            </div>
        </div>
    );
}

export default App;
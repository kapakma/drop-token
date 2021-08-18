function GameOverScreen({winner, onReset}) {
    return (
        <div className="overlay">
            <div className="content">
                <h1>{ winner === 0 ? 'Draw Game' : `Player ${winner} Wins` }</h1>
                <button className="btn btn-primary btn-lg" onClick={() => onReset()}>Play Again?</button>
            </div>
        </div>
    );
}

export default GameOverScreen;
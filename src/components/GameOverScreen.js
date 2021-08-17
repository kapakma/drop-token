function GameOverScreen({winner, onResetGame}) {
    return (
        <div className='overlay'>
            <h1>{ winner === 0 ? 'Draw Game' : `Player ${winner} Win` }</h1>
            <button className="btn btn-primary btn-lg" onClick={() => onResetGame()}>Play Again?</button>
        </div>
    );
}

export default GameOverScreen;
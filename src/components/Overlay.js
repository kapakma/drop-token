function Overlay({status, resetGame}) {
    return (
        <div className='overlay' onClick={() => resetGame()}>
            <span className='title'>{status == 1 || status == 2 ? `Player ${status} Win` : 'Draw Game'}</span>
        </div>
    );
}

export default Overlay;
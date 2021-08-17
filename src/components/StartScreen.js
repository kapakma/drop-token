function StartScreen({onStartGame}) {
    return (
        <div className='overlay'>
            <h1>Start First?</h1>
            <div>
                <button className="btn btn-primary btn-lg" onClick={() => onStartGame(1)}>Yes</button>&nbsp;&nbsp;
                <button className="btn btn-primary btn-lg" onClick={() => onStartGame(2)}>No</button>
            </div>
        </div>
    );
}

export default StartScreen;
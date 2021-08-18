function StartScreen({onStart}) {
    return (
        <div className='overlay'>
            <div className="content">
                <h1>Start First?</h1>
                <div>
                    <button className="btn btn-primary btn-lg mx-2" onClick={() => onStart(1)}>Yes</button>
                    <button className="btn btn-primary btn-lg mx-2" onClick={() => onStart(2)}>No</button>
                </div>
            </div>
        </div>
    );
}

export default StartScreen;
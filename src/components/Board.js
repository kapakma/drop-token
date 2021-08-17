import Column from './Column';

function Board({numRows, numCols, data, onDropToken}) {
    return (
        <div className="board">
        {
            [...Array(numCols)].map((elem, index) => 
                <Column key={index} colIndex={index} size={numRows} data={data} onDropToken={onDropToken} />
            )
        }
        </div>
    );
}

export default Board;
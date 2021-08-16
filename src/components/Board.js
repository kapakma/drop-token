import Column from './Column';

function Board({numRows, numCols, data, dropToken}) {
    return (
        <div className="board">
        {
            [...Array(numCols)].map((elem, index) => 
                <Column key={index} colIndex={index} size={numRows} data={data} dropToken={dropToken} />
            )
        }
        </div>
    );
}

export default Board;
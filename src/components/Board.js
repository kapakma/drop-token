import Column from './Column';

function Board({numRows, numCols, data, onTokenDrop}) {
    return (
        <div className="board">
        {
            [...Array(numCols)].map((elem, index) => 
                <Column key={index} colIndex={index} size={numRows} data={data} onTokenDrop={onTokenDrop} />
            )
        }
        </div>
    );
}

export default Board;
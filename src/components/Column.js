import Token from './Token';

function Column({colIndex, size, data, onTokenDrop}) {
    return (
        <div className="column" onClick={() => onTokenDrop(colIndex)} >
        {
            [...Array(size)].map((elem, index) => 
                <Token key={`${colIndex}-${index}`} value={data[index][colIndex]} />
            )
        }
        </div>
    );
}

export default Column;
import Token from './Token';

function Column({colIndex, size, data, onDropToken}) {
    return (
        <div className="column" onClick={() => onDropToken(colIndex)} >
        {
            [...Array(size)].map((elem, index) => 
                <Token key={`${colIndex}-${index}`} value={data[index][colIndex]} />
            )
        }
        </div>
    );
}

export default Column;
import Token from './Token';

function Column({colIndex, size, data, dropToken}) {
    return (
        <div className="column" onClick={() => dropToken(colIndex)} >
        {
            [...Array(size)].map((elem, index) => 
                <Token key={`${colIndex}-${index}`} value={data[index][colIndex]} />
            )
        }
        </div>
    );
}

export default Column;
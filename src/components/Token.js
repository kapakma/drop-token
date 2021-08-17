function Token({value}) {
    return <div className={ `token ${value === 1 ? "player-one" : (value === 2 && "player-two")}`} />;
}

export default Token;
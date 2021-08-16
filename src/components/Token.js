function Token({value}) {
    return <div className={ `token ${value === 1 ? "red-fill" : (value === 2 ? "blue-fill" : "")}`} />;
}

export default Token;
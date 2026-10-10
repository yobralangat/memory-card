export function Header({score, bestScore}) {
    return (
        <header className="header">
            <div className="title-section">
                <h1>Pokemon Memory Card Game</h1>
                <p>Get points by clicking on an image, but don't click any more than once!</p>
            </div>
            <div className="scoreboard">
                <div className="score-box">
                    <span>Current score:</span>
                    <strong>{score}</strong>
                </div>
                <div className="score-box highlight">
                    <span>Best Score:</span>
                    <strong>{bestScore}</strong>
                </div>
            </div>
        </header>
    );
}
export function Card({ card, onClick }) {
    return (
        <button
            type="button"
            className="memory-card"
            onClick={() => onClick(card.id)}
            >
            <div className="card-image-container">
                <img src={card.image} alt={card.name} loading='lazy' />
            </div>
            <p className="card-name">{card.name}</p>
        </button>
    );
}
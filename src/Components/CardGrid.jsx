import { Card } from "./Card";

export function CardGrid({ cards, onCardClick }) {
    return (
        <div className="card-grid">
            {cards.map((card) => (
                <Card key={card.id} card={card} onClick={onCardClick} />
            ))}
        </div>
    );
}
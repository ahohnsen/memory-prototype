import { useEffect, useState } from "react";

const initialCards = [
  { id: "1", text: "1" },
  { id: "2", text: "1" },
  { id: "3", text: "2" },
  { id: "4", text: "2" },
  { id: "5", text: "3" },
  { id: "6", text: "3" },
  { id: "7", text: "4" },
  { id: "8", text: "4" },
  { id: "9", text: "5" },
  { id: "10", text: "5" },
  { id: "11", text: "6" },
  { id: "12", text: "6" },
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isFlipDisabled, setIsFlipDisabled] = useState(false);

  function startGame() {
    setCards(initialCards.toSorted(() => Math.random() - 0.5));
    setFirstCard(null);
    setSecondCard(null);
  }

  function selectCard(selectedCard) {
    if (firstCard !== null && firstCard !== selectedCard) {
      setSecondCard(selectedCard);
    } else {
      setFirstCard(selectedCard);
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setIsFlipDisabled(true);

      if (firstCard.text === secondCard.text) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.text === firstCard.text ? { ...card, matched: true } : card
          );
        });
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setIsFlipDisabled(false);
  }

  return (
    <main>
      <h1>Memory Game</h1>
      <button onClick={startGame}>New Game</button>
      <section className="memory-grid">
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            content={card.text}
            isFlipped={card === firstCard || card === secondCard || card.matched === true}
            isFlipDisabled={isFlipDisabled}
            onSelectCard={() => selectCard(card)}
          />
        ))}
      </section>
    </main>
  );
}
export function MemoryCard({ content, isFlipped, isFlipDisabled, onSelectCard }) {
  return (
    <button
      className={"memory-card " + (isFlipped && "memory-card__front")}
      onClick={onSelectCard}
      disabled={isFlipDisabled}
    >
      {isFlipped && content}
    </button>
  );
}

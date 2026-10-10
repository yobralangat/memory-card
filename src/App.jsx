import { useState, useEffect, useRef } from "react";
import { Header } from '/src/Components/Header.jsx';
import { CardGrid } from '/src/Components/CardGrid.jsx';
import './App.css';

//12 pokemon ids to fetch
const pokemonIds = [1,3,7,25,39,52,100,130,150,155,140,170];

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bestScore, setBestScore] = useState(0);

  //Fisher-Yates SHuffle Algorithm
  const ShuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //fetch pokemon images from pokeapi when component mounts
  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const pokeapi = 'https://pokeapi.co/api/v2/pokemon/';
        const promises = pokemonIds.map(async(id) => {
          const response = await fetch(`${pokeapi}${id}`);
          const data = await response.json();
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
          };
        });

        const results = await Promise.all(promises);
        //shuffle cards on initial load
        setCards(ShuffleArray(results));
        setLoading(false);
      }
      catch (error) {
        console.error('Error fetching Pokemon cards', error);
        setLoading(false);
      }
    }
    fetchPokemonData();
  }, []);

  //handle card click logic
  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      //loss condition: card was already clicked
      setScore(0);
      setClickedIds([]);
    } else {
      //success condition: new card clicked
      const newScore = score + 1;
      setScore(newScore);
      setClickedIds((prevClickedIds) => [...prevClickedIds, id]);

      //update high score
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
    //always shuffle cards on every card click
    setCards((prevCards) => ShuffleArray(prevCards));
  }

  return (
    <div className="app-container">
      <Header score={score} bestScore={bestScore} />
      {loading ? (
        <div className="loading-spinner">Loading Pokemon Cards...</div>
      ) : (
        <CardGrid cards={cards} onCardClick={handleCardClick} />
      )}
    </div>
  );
}
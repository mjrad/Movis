import React, { useState, useEffect } from 'react';

import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetMovieRandom from '../hooks/useGetMovieRandom';
import '../App.css';
import TopRated from './toprated';


function TriviaCard(props) {
  return (
    <div className="genreCard">
      <h2 className="genreCardTitle"></h2>
      <img id={props.title+"img"} className="genreImage" src={props.image} onError={() => {
        document.getElementById(props.title+"img").src='https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png';
      }}/>
    </div>
  );
}

function Trivia(props) {

  const [ inputQuery, setInputQuery ] = useState();

  const [ triviaCount, setTriviaCount ] = useState(0);

  const [randomMovies, randomLoading, randomError] = useGetMovieRandom("a");

  var random = randomMovies[triviaCount];

  let randomPage = Math.floor(Math.random() * 20)

  const movieURL = "https://image.tmdb.org/t/p/original";

  if(random == null){
      return (
        <div className="trivia">
          <h1> Trivia </h1>
        </div>
      );
  } else {

      return (
        <div className="triviaContainer" >
          <div className="trivia">

              <h1 className="triviaTitle"> Trivia of the Day! </h1>

              <img className="triviaPhoto" src={movieURL + random.poster_path} height="300px" width="200px" />

              <form onSubmit={(e) => {

                  e.preventDefault();

                  if(inputQuery.toLowerCase() == random.title.toLowerCase()){

                    setInputQuery("")
                    setTriviaCount(triviaCount + 1);
                    random = randomMovies[randomPage];

                  } else {

                    setInputQuery("")
                    randomPage = Math.floor(Math.random() * 20);
                    random = randomMovies[randomPage];
                    setTriviaCount(0);

                  }

                }}>

              <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />

            </form>
          <h3 className="triviaGuesses"> Guesses in a row: {triviaCount}/20 </h3>
        </div>

      </div>
      );
  }
}
export default Trivia;

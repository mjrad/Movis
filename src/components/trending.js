import React, { useState, useEffect } from 'react';

import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetTrending from '../hooks/useGetTrending';
import '../App.css';
import Trivia from './trivia';


function TrendingCard(props) {

  if (props.title) {
      var movieLink = `http://localhost:3000/movies?q=${props.title}`
  }
  else {
      movieLink = null
  }

  return (
    <a className="trendingLink" href={movieLink}>
      <div className="trendingCard">
        <img id={props.title+"img"} className="trendingImage" src={props.image} onError={() => {
          document.getElementById(props.title+"img").src='https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png';
        }}/>
        <div className="trendingDescription">
          <h2 className="trendingCardTitle"> {props.title} </h2>
          <h2 className="trendingCardRating"> Genre: {props.vote_average} / 10 ⭐</h2>
        </div>
      </div>
    </a>
  );
}

function Trending(props) {

  const [ trending, loading, error, displayLabels ] = useGetTrending(props);

  let trendingMovies = trending.slice(0,5);

  return (
    <div className="trendingContainer">
        <div className="trending">
            <h1 className="trendingTitle"> Trending Movies </h1>
            {loading ? (
                <Spinner />
            ) : (
              <ul className="trendingList">
              {trendingMovies.map(movie => <TrendingCard key={movie.title} title={movie.title} vote_average={movie.vote_average} release_date={movie.release_date} image={"https://image.tmdb.org/t/p/original/" + movie.poster_path}/>)}
              </ul>
            )}
          </div>
          {error && <ErrorContainer>Error!</ErrorContainer>}
      </div>
  );
}

export default Trending;

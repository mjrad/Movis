import React, { useState, useEffect } from 'react';

import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetTopRated from '../hooks/useGetTopRated';
import '../App.css';


function TopRatedCard(props) {

  if (props.title) {
      var movieLink = `http://localhost:3000/movies?q=${props.title}`
  }
  else {
      movieLink = null
  }

  return (
    <a className="topRatedLink" href={movieLink}>
      <div className="topRatedCard">
        <img id={props.title+"img"} className="topRatedImg" src={props.image} onError={() => {
          document.getElementById(props.title+"img").src='https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png';
        }}/>
        <div className="topRatedDescription">
          <h2 className="topRatedCardTitle"> {props.title} </h2>
          <h2 className="topRatedVotes"> Average Rating: {props.vote_average} / 10 ⭐ </h2>
        </div>
      </div>
    </a>
  );
}

function TopRated(props) {

  const [ topRated, loading, error, displayLabels ] = useGetTopRated(props);

  let topRatedMovies = topRated.slice(0,2);

  return (
    <div className="trendingContainer">
        <div className="trending">
            <h1 className="trendingTitle"> Top Rated Movies </h1>
            {loading ? (
                <Spinner />
            ) : (
              <ul className="trendingList">
              {topRatedMovies.map(movie => <TopRatedCard key={movie.title} title={movie.title} release_date={movie.release_date} vote_average={movie.vote_average} image={"https://image.tmdb.org/t/p/original/" + movie.poster_path}/>)}
              </ul>
            )}
          </div>
          {error && <ErrorContainer>Error!</ErrorContainer>}
      </div>
  );
}

export default TopRated;

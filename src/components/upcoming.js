import React, { useState, useEffect } from 'react';

import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetUpcoming from '../hooks/useGetUpcoming';
import '../App.css';


function UpcomingCard(props) {

  if (props.title) {
      var movieLink = `http://localhost:3000/movies?q=${props.title}`
  }
  else {
      movieLink = null
  }

  return (
    <a className="upcomingLink" href={movieLink}>
      <div className="upcomingCard">
        <img id={props.title+"img"} className="upcomingImage" src={props.image} onError={() => {
          document.getElementById(props.title+"img").src='https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png';
        }}/>
        <div className="upcomingDescription">
          <h2 className="upcomingCardTitle"> {props.title} </h2>
          <h2 className="upcomingCardDate"> Release Date: {props.release_date} </h2>
        </div>
      </div>
    </a>
  );
}

function Upcoming(props) {

  const [ upcoming, loading, error, displayLabels ] = useGetUpcoming(props);

  let upcomingMovies = upcoming.slice(0,6);

  return (
    <div className="upcomingContainer">
        <div className="upcoming">
            <h1 className="upcomingTitle"> In Theaters </h1>
            {loading ? (
                <Spinner />
            ) : (
              <ul className="trendingList">
              {upcomingMovies.map(movie => <UpcomingCard key={movie.title} title={movie.title} release_date={movie.release_date} image={"https://image.tmdb.org/t/p/original/" + movie.poster_path}/>)}
              </ul>
            )}
          </div>
          {error && <ErrorContainer>Error!</ErrorContainer>}
      </div>
  );
}

export default Upcoming;

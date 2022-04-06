import React, { useState, useEffect } from 'react';
import { Route, Routes, useSearchParams, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css'
import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetGenres from '../hooks/useGetGenres';
import useGetMoviesByGenre from '../hooks/useGetMoviesByGenre';

var filter = [];

function GenreCard(props) {
  var movieLink = `http://localhost:3000/movies?q=${props.title}`
  return (
    <a href={movieLink} >
      <div className="genreCard">
        <h2 className="genreCardTitle">{props.title} {props.year != "" ? "(" + props.year + ")" : ""}</h2>
        <img id={props.title + "img"} className="genreImage" src={props.image} onError={() => {
          console.log("HERE")
          document.getElementById(props.title + "img").src = 'https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png';
        }} />
        <h2 className="genreCardTitle">{props.rating} / 10 ⭐</h2>
      </div>
    </a >
  );
}

function GenreSearch() {
  var query = "";
  var idx = 0;
  for (var genre in filter) {
    if (idx != 0) {
      query = query + ",";
    }
    query = query + filter[idx].toString();
    idx += 1;
  }
  const [movies, loading, error, displayLabels] = useGetMoviesByGenre(query);

  return (
    <div>
      <div className="genreRow">
        {loading ? (
          <Spinner />
        ) : (
          <div >
            {movies.length != 0 ? (movies.map(movie => <GenreCard key={movie.title} title={movie.title} rating={movie.vote_average} image={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />))
              : <div />}
          </div>
        )}
      </div>
      {error && <ErrorContainer>Error!</ErrorContainer>}
    </div>
  );
}

function GenreButton(props) {
  return (
    <div className="genreButtonHolder">
      <button id={"button" + props.type} className="genreButton" onClick={() => {
        if (document.getElementById("button" + props.type).style.background != "lightseagreen") {
          document.getElementById("button" + props.type).style.background = "lightseagreen";
          document.getElementById("button" + props.type).style.color = "white";
          filter.push(props.num);
        }
        else {
          document.getElementById("button" + props.type).style.background = "white";
          document.getElementById("button" + props.type).style.color = "black";
          var idx = 0;
          for (var num in filter) {
            if (filter[idx] == props.num) {
              filter.splice(idx, 1);
            }
            idx += 1;
          }
        }
      }}>{props.type}</button>
    </div>
  );
}

function GenreLabel(props) {
  var idx = 0;
  var searches = [];
  for (var item in props.genres) {
    if (props.search.includes(props.genres[idx].id)) {
      searches.push(props.genres[idx].name);
    }
    idx += 1;
  }
  return (
    <div className="genreLabels">
      <div>
        <h1>You searched:</h1>
      </div>
      {searches.map(srch => (
        <div className="genreDisplay">
          <h1>{srch}</h1>
        </div>
      ))}
    </div>
  );
}

function Genres({ query }) {
  filter = []

  const [genres, loading, error, displayLabels] = useGetGenres("g");
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, loading1, error1, displayLabels1] = useGetMoviesByGenre(query);
  return (
    <div className="mainContent" >

      <div className="forecastContent">
        <div className="genreTitle">
          <h1>Search Movies by Genre<button className="genreSeachButton" onClick={() => {
            var qry = "";
            var idx = 0;
            for (var genre in filter) {
              if (idx != 0) {
                qry = qry + ",";
              }
              qry = qry + filter[idx].toString();
              idx += 1;
            }
            setSearchParams({ q: qry })
            if (qry != "") {
              const buttons = document.querySelectorAll(`*[id^="button"]`);
              var idx = 0;
              var btns = Array.prototype.slice.call(buttons);
              for (var button in btns) {
                btns[idx].style.background = "white";
                btns[idx].style.color = "black";
                idx += 1;
              }
            }
          }}>🔎</button></h1>
        </div>

        <div className="filterHolder">
          {loading ? (
            <Spinner />
          ) : (
            (genres.length != 0 ?
              (genres.map(genre => <GenreButton key={genre.id} type={genre.name} num={genre.id} />))
              : <div />
            )
          )}
        </div>
        <div className="genreLabelsHolder">
          {(movies.length == 0) ? (<div />) :
            <GenreLabel search={query} genres={genres} />}
        </div>
        <div className="genreRow">
          {loading1 ? (
            <Spinner />
          ) : (
            <div>
              {movies.length != 0 ? (movies.map(movie => <GenreCard key={movie.title} title={movie.title.length <= 40 ? movie.title : movie.title.substring(0, 40) + "..."} year={movie.release_date ? movie.release_date.substring(0, 4) : ""} rating={movie.vote_average} image={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />))
                : (window.location.href.includes("?") ?
                  <div className="noGenreResults">
                    <h1>No movies match filters!</h1>
                  </div> : <div></div>)}
            </div>
          )}
        </div>
        {(error || error1) && <ErrorContainer>Error!</ErrorContainer>}
      </div>
    </div>
  );
}


export default Genres

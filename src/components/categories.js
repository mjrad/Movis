import React, { useState, useEffect } from 'react';
import { Route, Routes, useSearchParams, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';
import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetCategory from '../hooks/useGetCategory';

var filter = ""

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
    </a>

  );
}

function CategoryButton(props) {
  return (
    <div className="genreButtonHolder">
      <button id={"button" + props.type} className="genreButton" onClick={() => {
        if (document.getElementById("button" + props.type).style.background != "lightseagreen") {
          const buttons = document.querySelectorAll(`*[id^="button"]`);
          var idx = 0;
          var btns = Array.prototype.slice.call(buttons);
          for (var button in btns) {
            if (btns[idx] != document.getElementById("button" + props.type)) {
              btns[idx].style.background = "white";
              btns[idx].style.color = "black";
            }
            idx += 1;
          }
          document.getElementById("button" + props.type).style.background = "lightseagreen";
          document.getElementById("button" + props.type).style.color = "white";
          filter = props.type;
        }
        else {
          document.getElementById("button" + props.type).style.background = "white";
          document.getElementById("button" + props.type).style.color = "black";
          filter = "";
        }
      }}>{props.type}</button>
    </div>
  );
}

function Categories({ query }) {
  filter = "";
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, loading, error, displayLabels] = useGetCategory(query);
  return (
    <div className="mainContent" >

      <div className="forecastContent">
        <div className="genreTitle">
          <h1>Search Movies by Category<button className="genreSeachButton" onClick={() => {
            if (filter != "") {
              setSearchParams({ q: filter })
            }
          }}>🔎</button></h1>
        </div>

        <div className="filterHolder">
          <CategoryButton type="Upcoming" />
          <CategoryButton type="Now Playing" />
          <CategoryButton type="Popular" />
          <CategoryButton type="Top Rated" />
        </div>
        <div className="genreRow">
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {movies.length != 0 ? (movies.map(movie => <GenreCard key={movie.title} title={movie.title} year={movie.release_date ? movie.release_date.substring(0, 4) : ""} rating={movie.vote_average} image={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />))
                : (window.location.href.includes("?") ?
                  <div className="noGenreResults">
                    <h1>No movies match filters!</h1>
                  </div> : <div></div>)}
            </div>
          )}
        </div>
        {error && <ErrorContainer>Error!</ErrorContainer>}
      </div>
    </div>
  );
}


export default Categories

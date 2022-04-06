/**@jsxImportSource @emotion/react*/

import React, { useState, useEffect } from 'react';
import { Route, Routes, useSearchParams, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'
import Search from './components/search'
import Genres from './components/genres'
import Categories from './components/categories'
import Trending from './components/trending'
import Trivia from './components/trivia'
import Upcoming from './components/upcoming'

import Movies from './components/movies'
import Actors from './components/actors';


import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

import {
  faFilm
} from "@fortawesome/free-solid-svg-icons";

function Home() {

  return (
    <div className="homePage">
      <Trending />
      <Upcoming />
      <Trivia />
    </div>
  );
}
function NotFound() {

  return <h1 className="notFound">404: Not found</h1>;
}

function App() {

  const [searchParams] = useSearchParams()
  return (
    <div>
      <div className="navBar">

      <div className='navItemDiv'>
        <p className='navitemTitle'><NavLink to="" className='navitemTitle'><FontAwesomeIcon icon={faFilm} /> Movies</NavLink></p>
      </div>
        <div className='navItemDiv'>
          <p className='navItem'><NavLink to="/movies">Movie</NavLink></p>
        </div>
        <div className='navItemDiv'>
          <p className='navItem'><NavLink to="/actors">Actors</NavLink></p>
        </div>
        <div className='navItemDiv'>
          <p className='navItem'><NavLink to="/genres">Genres</NavLink></p>
        </div>
        <div className='navItemDiv'>
          <p className='navItem'><NavLink to="/categories">Categories</NavLink></p>
        </div>
      </div>

      <Routes>
        <Route path="" element={<Home />} />

        <Route
          path='/movies'
          element={
            <Movies query={searchParams.get("q")} />}
        />

        <Route
          path='/actors'
          element={
            <Actors query={searchParams.get("q")} />}
        />
        <Route
          path='/genres'
          element={
            <Genres query={searchParams.get("q")} />}
        />
        <Route
          path='/categories'
          element={
            <Categories query={searchParams.get("q")} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="footer">
        <div className={"footerDiv"}>
          <p>
            <a className={"footerLinks"} href="https://www.instagram.com/patswhereitsat/">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </p>
          <p>
            <a className={"footerLinks"} href="https://www.instagram.com/patswhereitsat/">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </p>
          <p>
            <a className={"footerLinks"} href="https://www.instagram.com/patswhereitsat/">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </p>
          <p>
            <a className={"footerLinks"} href="https://www.instagram.com/patswhereitsat/">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;

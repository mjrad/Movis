import React, { useState, useEffect } from 'react';
import { Route, Routes, useSearchParams, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css'
import useForecastSearch from '../hooks/useForecastSearch'; 
import Spinner from './spinner';
import ErrorContainer from './error_container';

function Search({ query }) {

    const [inputQuery, setInputQuery] = useState(query || "");
    const [searchParams, setSearchParams] = useSearchParams()
    const [forecasts, loading, error, displayLabels] = useForecastSearch(query);
  
    return (
      <div className="searchDiv" >

            <form className="submit" onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ q: inputQuery })
            }}>
              <div className='rowCenter'>
              <input value={inputQuery} placeholder="Enter a City..." onChange={e => setInputQuery(e.target.value)} />
              <button className="inputButton" type="submit">🔎</button>
              </div>
            

            </form>
  
          <div className="cardContainer">
  
            {loading ? (
              <Spinner />
            ) : (
              <div >
              
              </div>
            )}
          </div>
          {error && <ErrorContainer>Error!</ErrorContainer>}
       
      </div>
    );
  }
  

  export default Search
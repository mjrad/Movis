import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';
import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetMovie from '../hooks/useGetMovie'
import useGetMovieRandom from '../hooks/useGetMovieRandom'

function MovieCard({ data }) {

    const genres = [{ "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }]

    var genreList = "";

    for (let i = 0; i < data.genre_ids.length; i++) {
        for (let j = 0; j < genres.length; j++) {
            if (data.genre_ids[i] == genres[j].id) {
                genreList += genres[j].name + ", "
            }
        }
    }

    genreList = genreList.substring(0, genreList.length - 2);
    var MovieImg = "https://image.tmdb.org/t/p/original" + data.poster_path
    return (
        <div className='rowCenter'>
            <div className='titleWithCard'>
                <p className='movieTitle'>{data.original_title}</p>
                <div className='movieCard'>
                    <div className='movieSpacing'>
                        <img src={MovieImg} alt="" height="300px" width="200px" />

                        <div className='movieStatsDiv'>
                            <p className='movieStatsLabel '>User Score  </p>
                            <p className='userScore'> {data.vote_average}/10</p>
                        </div>
                        <div className='movieStatsDiv'>
                                <p className='movieStatsLabel'>Genres</p>
                                <p className='genresValue'>{genreList}</p>
                        </div>
                        <div className='movieStatsDiv'>
                            <p className='movieStatsLabel'>Release Date</p>
                            <p className='releaseDate'>{data.release_date}</p>
                        </div>
                        <div className='overviewCard'>
                            <p className='overviewTitle'>Overview</p>
                            <p className='overviewContent'>{data.overview || "Sorry, this movie does not have an overview :("}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Movies({ query }) {
    const [inputQuery, setInputQuery] = useState(query || "");
    const [searchParams, setSearchParams] = useSearchParams()
    const [movies, loading, error] = useGetMovie(query);
    const [randomMovies, randomLoading, randomError] = useGetMovieRandom("a");

    console.log("== Random Movie", randomMovies[0]);
    //logic for displaying random movies or not
    var rand = true;
    if (query)
        rand = !rand

    if (!rand) {
        return (
            <div className="mainContent" >
                <div className="">
                    <form className="submit" onSubmit={(e) => {
                        e.preventDefault();
                        setSearchParams({ q: inputQuery })
                    }}>
                        <div className='rowCenter'>
                            <input value={inputQuery} placeholder="Search movies..." onChange={e => setInputQuery(e.target.value)} />
                            <button className="inputButton" type="submit">🔎</button>
                        </div>
                    </form>
                    <div className="cardContainer">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div>
                                {movies.map(movie => <li key={movie.id}><MovieCard data={movie} /></li>)}
                            </div>
                        )}
                    </div>
                    {error && <ErrorContainer>Error!</ErrorContainer>}
                </div >
            </div >
        );
    } else {
        return (
            <div className="mainContent" >
                <div className="">
                    <form className="submit" onSubmit={(e) => {
                        e.preventDefault();
                        setSearchParams({ q: inputQuery })
                    }}>
                        <div className='rowCenter'>
                            <input value={inputQuery} placeholder="Search movies..." onChange={e => setInputQuery(e.target.value)} />
                            <button className="inputButton" type="submit">🔎</button>
                        </div>
                    </form>
                    <div className="cardContainer">
                        {randomLoading ? (
                            <Spinner />
                        ) : (
                            <div>
                                <div className='rowCenter'>
                                    <div className=' randomMoviesTitleDiv' >
                                        <p className='randomMoviesTitle'>Random Movies You Might Enjoy</p>
                                    </div>
                                </div>
                                {randomMovies.map(movie => <li key={movie.id}><MovieCard data={movie} /></li>)}
                            </div>
                        )}
                    </div>
                    {randomError && <ErrorContainer>Error!</ErrorContainer>}
                </div >
            </div >
        );
    }
}

export default Movies

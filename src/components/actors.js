import React, { useState, useEffect } from 'react';
import { useSearchParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';
import Spinner from './spinner';
import ErrorContainer from './error_container';
import useGetPeople from '../hooks/useGetPeople'
import useGetPeoplePopular from '../hooks/useGetPeoplePopular';

function KnownForCard({ data }) {

    var movieImg = "https://image.tmdb.org/t/p/original" + data.poster_path

    if (data.original_title) {
        var movieLink = `http://localhost:3000/movies?q=${data.original_title}`
    }
    else {
        movieLink = null
    }
    return (
        <a className='knownForLink' href={movieLink}>
            <div className='knownForCard' >
                <img src={movieImg} alt="" height="225px" width="150px" title="asdfaasdf" />
                <div className='imgOverlay'>
                    <div className='text'>{data.original_title || data.name}</div>
                </div>

            </div>
        </a>
    )
}

function ActorCard({ data, ranking, index }) {

    var actorImg = "https://image.tmdb.org/t/p/original" + data.profile_path

    if (ranking == false) {
        return (
            <div className='rowCenter'>
                <div className='titleWithCard'>
                    <p className='movieTitle'> {data.name}</p>
                    <div className='movieCard'>
                        <div className='movieSpacing'>
                            <img src={actorImg} alt="" height="300px" width="200px" />
                            <div className='knowForLabel'>
                                <p>Best Known For</p>
                            </div>
                            <div className='vl'></div>

                            <div className='knownForOuterContainer'>
                                <div className='knownForInnerContainer' >
                                    {data.known_for.map(movie => <div key={movie.id}><KnownForCard data={movie} /></div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (ranking == true) {
        return (

            <div className='rowCenter'>
                <div className='titleWithCard'>
                    <p className='movieTitle'> {index + 1}. {data.name}</p>
                    <div className='movieCard'>

                        <div className='movieSpacing'>
                            <img src={actorImg} alt="" height="300px" width="200px" />
                            <div className='knowForLabel'>
                                <p>Best Known For</p>
                            </div>
                            <div className='vl'></div>
                            <div className='knownForOuterContainer'>
                                <div className='knownForInnerContainer' >
                                    {data.known_for.map(movie => <div key={movie.id}><KnownForCard data={movie} /></div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Actors({ query }) {

    const [inputQuery, setInputQuery] = useState(query || "");
    const [searchParams, setSearchParams] = useSearchParams()
    const [peoples, loading, error, displayLabels] = useGetPeople(query);
    const [popularPeople, peopleLoading, peopleError] = useGetPeoplePopular("a");

    //logic for displaying random movies or not
    var popular = true;
    if (query)
    popular = !popular

    if (!popular) {
        return (
            <div className="mainContent" >
                <div className="">
                    <form className="submit" onSubmit={(e) => {
                        e.preventDefault();
                        setSearchParams({ q: inputQuery })
                    }}>
                        <div className='rowCenter'>
                            <input value={inputQuery} placeholder="Search actors..." onChange={e => setInputQuery(e.target.value)} />
                            <button className="inputButton" type="submit">🔎</button>
                        </div>

                    </form>
                    <div className="cardContainer">

                        {loading ? (
                            <Spinner />
                        ) : (
                            <div >
                                {peoples.map(person => <li key={person.id}><ActorCard data={person} ranking={false} /></li>)}
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
                            <input value={inputQuery} placeholder="Search actors..." onChange={e => setInputQuery(e.target.value)} />
                            <button className="inputButton" type="submit">🔎</button>
                        </div>

                    </form>
                    <div className="cardContainer">

                        {peopleLoading ? (
                            <Spinner />
                        ) : (
                            <div >
                                <div className='rowCenter'>
                                    <div className=' randomMoviesTitleDiv' >
                                        <p className='randomMoviesTitle'>Popular Actors Right Now</p>
                                    </div>
                                </div>
                                {popularPeople.map((person, index) => <li key={person.id}><ActorCard data={person} ranking={true} index={index} /></li>)}
                            </div>
                        )}
                    </div>
                    {peopleError && <ErrorContainer>Error!</ErrorContainer>}
                </div >
            </div >
        );
    }
}

export default Actors
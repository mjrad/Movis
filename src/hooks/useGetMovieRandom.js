import React, { useState, useEffect } from 'react';

function useGetMovieRandom(query) {

    const [randomMovies, setRandomMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayRandom, setDisplayRandom] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        let ignore = false;
        let randomPage = Math.floor(Math.random() * 500)

        async function FetchRandomMovie() {
            console.log("err")
            let responseBody = {};
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}`, {
                        signal: controller.signal
                    }
                );

                responseBody = await response.json()
                console.log(response)
                if (response.status != 200) {
                    setError(true);
                    return
                }

            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled")
                } else {
                    setError(true);
                    throw e;
                }
            }
            if (!ignore) {
                setLoading(false);
                setError(false);
                setRandomMovies(responseBody.results || [])
                setDisplayRandom(true)
            }
        }
        if (query) {
            FetchRandomMovie()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [randomMovies, loading, error, displayRandom]
}

export default useGetMovieRandom;
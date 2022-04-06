import React, { useState, useEffect } from 'react';


function useGetMovie(query) {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        async function FetchMovie() {
            let responseBody = {};
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&query=${query}&page=1&include_adult=false`, {
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
                setMovies(responseBody.results || [])
            }
        }
        if (query) {
            FetchMovie()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [movies, loading, error]
}

export default useGetMovie;
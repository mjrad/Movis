import React, { useState, useEffect } from 'react';


function useGetMovieLatest(query) {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayLabels, setdisplayLabels] = useState(false);

    useEffect(() => {
        setdisplayLabels(false);
        let ignore = false;
        const controller = new AbortController();

        async function FetchLatestMovie() {
            let responseBody = {};
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/latest?api_key=${query}&language=en-US`, {
                        signal: controller.signal
                    }
                );

                responseBody = await response.json()
                console.log(response)
                if (response.status != 200) {
                    console.log("inside status check")
                    setError(true);

                    return
                }

            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled")
                } else {
                    console.log("inside cancel")
                    setError(true);
                    throw e;
                }
            }
            if (!ignore) {
                setLoading(false);
                setError(false);
                setdisplayLabels(true);
                setMovies(responseBody || [])
                console.log("get is happening")
            }
        }
        if (query) {
            FetchLatestMovie()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [movies, loading, error, displayLabels]

}
export default useGetMovieLatest;
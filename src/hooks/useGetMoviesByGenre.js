import React, { useState, useEffect } from 'react';

function useGetMoviesByGenre(query) {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayLabels, setdisplayLabels] = useState(false);

    useEffect(() => {
        setdisplayLabels(false);
        let ignore = false;
        const controller = new AbortController();
        const controller1 = new AbortController();
        const controller2 = new AbortController();

        async function FetchMovies() {
            let responseBody = {};
            let responseBody1 = {};
            let responseBody2 = {};
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&with_genres=${query}&page=1`,
                    {
                        signal: controller.signal
                    }
                );

                responseBody = await response.json()
                if (response.status != 200){
                    console.log("inside status check")
                    setError(true);
                    return
                }

            }
            catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled")
                } else {
                    console.log("inside cancel")
                    setError(true);
                    throw e;
                }
            }
            try {
                const response1 = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&with_genres=${query}&page=2`,
                    {
                        signal: controller1.signal
                    }
                );

                responseBody1 = await response1.json()
                if (response1.status != 200){
                    console.log("inside status check")
                    setError(true);
                    return
                }

            }
            catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled")
                } else {
                    console.log("inside cancel")
                    setError(true);
                    throw e;
                }
            }
            try {
                const response2 = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&with_genres=${query}&page=3`,
                    {
                        signal: controller2.signal
                    }
                );

                responseBody2 = await response2.json()
                if (response2.status != 200){
                    console.log("inside status check")
                    setError(true);
                    return
                }

            }
            catch (e) {
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
                var res = responseBody.results;
                var idx = 0;
                for (var idx in responseBody1.results)
                {
                  res.push(responseBody1.results[idx]);
                  idx += 1;
                }
                idx = 0;
                for (var idx in responseBody2.results)
                {
                  res.push(responseBody2.results[idx]);
                  idx += 1;
                }
                setMovies(res || [])
            }
        }
        if (query) {
            FetchMovies()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [movies, loading, error, displayLabels]

}
export default useGetMoviesByGenre;

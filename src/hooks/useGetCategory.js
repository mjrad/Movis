import React, { useState, useEffect } from 'react';

function useGetCategory(query) {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayLabels, setdisplayLabels] = useState(false);

    console.log(query);
    var string = ``;
    if (query == "Popular") {
      string = `https://api.themoviedb.org/3/movie/popular?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=`;
    } else if (query == "Top Rated") {
      string = `https://api.themoviedb.org/3/movie/top_rated?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=`;
    } else if (query == "Now Playing") {
      string = `https://api.themoviedb.org/3/movie/now_playing?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=`;
    } else if (query == "Upcoming") {
      string = `https://api.themoviedb.org/3/movie/upcoming?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=`;
    } else if (query == "Latest") {
      string = `https://api.themoviedb.org/3/movie/latest?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=`;
    }

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
                const str = string+`1`
                const response = await fetch(
                    str,
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
                const str = string+`2`
                const response1 = await fetch(
                    str,
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
                const str = string+`3`
                const response2 = await fetch(
                    str,
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
export default useGetCategory;

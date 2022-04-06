import React, { useState, useEffect } from 'react';

function useGetTopRated(query) {

    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayLabels, setdisplayLabels] = useState(false);

    useEffect(() => {
        setdisplayLabels(false);
        let ignore = false;
        const controller = new AbortController();

        async function FetchTop() {
            let responseBody = {};
            setLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=1`,
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
            if (!ignore) {
                setLoading(false);
                setError(false);
                setdisplayLabels(true);
                setTopRated(responseBody.results || [])
            }
        }
        if(query) {
          FetchTop();
        }
        return () => {
            controller.abort();
            ignore = true;
        }
    }, [query]);

    return [topRated, loading, error, displayLabels]
}
export default useGetTopRated;

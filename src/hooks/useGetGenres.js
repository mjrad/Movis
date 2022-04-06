import React, { useState, useEffect } from 'react';

function useGetGenres(query) {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayLabels, setdisplayLabels] = useState(false);

    useEffect(() => {
        setdisplayLabels(false);
        let ignore = false;
        const controller = new AbortController();

        async function FetchGenres() {
            let responseBody = {};
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e`,
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
                setGenres(responseBody.genres || [])
            }
        }
        if (query) {
            FetchGenres()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [genres, loading, error, displayLabels]

}
export default useGetGenres;

import React, { useState, useEffect } from 'react';

function useForecastSearch(query) {

    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [displayLabels, setdisplayLabels] = useState(false);

    useEffect(() => {
        setdisplayLabels(false);
        let ignore = false;
        const controller = new AbortController();

        async function FetchForecastResults() {
            let responseBody = {};
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`,
                    {
                        signal: controller.signal
                    }
                );
                
                responseBody = await response.json()
                console.log(response)
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
                setForecasts(responseBody.list || [])
            }
        }
        if (query) {
            FetchForecastResults()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [forecasts, loading, error, displayLabels]

}
export default useForecastSearch;
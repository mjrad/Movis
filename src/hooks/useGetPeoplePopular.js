import React, { useState, useEffect } from 'react';


function useGetPeoplePopular(query) {

    const [popularPeople, setPopularPeople] = useState([]);
    const [peopleLoading, setPeopleLoading] = useState(false);
    const [peopleError, setPeopleError] = useState(false);
    const [displayPopular, setDisplayPopular] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        let ignore = false;

        async function FetchPopularPeople() {
            let responseBody = {};
            setPeopleLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/popular?api_key=3e9bbc0b0778c74b0f8881a1c6685c3e&language=en-US&page=1`, {
                        signal: controller.signal
                    }
                );

                responseBody = await response.json()
                console.log(response)
                if (response.status != 200) {
                    setPeopleError(true);
                    return
                }

            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled")
                } else {
                    setPeopleError(true);
                    throw e;
                }
            }
            if (!ignore) {
                setPeopleLoading(false);
                setPeopleError(false);
                setPopularPeople(responseBody.results || [])
                setDisplayPopular(true)
            }
        }
        if (query) {
            FetchPopularPeople()
        }
        return () => {
            controller.abort();
            ignore = true;
        }

    }, [query]);

    return [popularPeople, peopleLoading, peopleError, displayPopular]

}
export default useGetPeoplePopular;
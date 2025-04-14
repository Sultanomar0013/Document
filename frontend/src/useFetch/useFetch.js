import { useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);

    const fetchData = async (url, options) => {
        setLoadingFetch(true);
        setErrorFetch(null);

        try {

            const response = await fetch(url, options);
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Fetch error');
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            console.error('Fetch error:', err);
            setErrorFetch(err.message);
            return null;
        } finally {
            setLoadingFetch(false);
        }
    };

    return { data, loadingFetch, errorFetch, fetchData };
};

export default useFetch;
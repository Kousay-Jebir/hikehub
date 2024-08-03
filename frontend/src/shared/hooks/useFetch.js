// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Introduce a small delay (e.g., 1 second) for testing
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await fetchFunction();
        setData(result);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch/useFetch';

function Authenticate({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const { fetchData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate('/');
        return;
      }

      const url = `${import.meta.env.VITE_ADRESS}/api/auth`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const data = await fetchData(url, options);
      if (!data || !data.success) {
        //here I have to work########## about token issue
        // localStorage.removeItem('token');
        // navigate('/');
      } else {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}

export default Authenticate;

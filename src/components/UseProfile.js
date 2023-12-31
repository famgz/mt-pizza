import { useEffect, useState } from 'react';

export function useProfile(params) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile').then((response) => {
      response.json().then((data) => {
        setData(data.admin);
        setLoading(false);
      });
    });
  }, []);

  return {loading, data}
}

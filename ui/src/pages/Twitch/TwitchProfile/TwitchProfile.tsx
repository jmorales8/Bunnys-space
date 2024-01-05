import { useEffect, useState } from "react";

export function TwitchProfile() {
  const [data, setData] = useState({isLive: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/twitch');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.isLive ? "Live" : "Not live"}
    </div>
  );
}

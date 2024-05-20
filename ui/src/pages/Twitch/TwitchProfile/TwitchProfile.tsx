import { useEffect, useState } from "react";

export function TwitchProfile() {
  const [data, setData] = useState({ isLive: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/twitch');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  let isUserLive = data.isLive;
  return (
    <div className="profile">
      {loading ?
        <> loading </>
        :
        <>
          {isUserLive
            ? <>
                bruh
                <img src="bunnyL.jpg" className="twitch__profile__icon__true" />
              </>
            : <img src="bunnyL.jpg" className="twitch__profile__icon__false" />}
        </>
      }
    </div>
  );
}

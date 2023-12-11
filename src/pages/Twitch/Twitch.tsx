import React, { useEffect, useState } from "react";

export async function CheckIfLive(username: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
      headers: {
        'Client-ID': 'xv6l0sazek8yl5bissuo4hndgvf0k5', // Replace with your Twitch Client ID
        'Authorization': 'Bearer YOUR_TWITCH_ACCESS_TOKEN', // Replace with your Twitch Access Token
      },
    });

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      console.log(`${username} is live`);
      return true;
    } else {
      console.log(`${username} is not live`);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }

  return false;
}

export function Twitch() {
  const [isLive, setIsLive] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CheckIfLive("caseoh_");
        setIsLive(result);
      } catch (error) {
        console.error("Error checking if live:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLive === null ? (
        <p>Loading...</p>
      ) : isLive ? (
        <p>The user is live!</p>
      ) : (
        <p>The user is not live.</p>
      )}
    </>
  );
}

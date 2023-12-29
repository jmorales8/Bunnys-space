// import GetTwitchStatus from '../../../../api/index'

import { useEffect, useState } from "react";
import { TwitchProfile } from "./TwitchProfile/TwitchProfile";

// const isLive = GetTwitchStatus();


export function Twitch() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, [])
  return (
    <>
      <TwitchProfile />
      {/* <p>The user is not live.</p> */}
      {!data ? "loading" : data}
    </>
  );
}

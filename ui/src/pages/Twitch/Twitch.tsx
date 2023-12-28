// import GetTwitchStatus from '../../../../api/index'

import { useEffect, useState } from "react";

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

      {/* <p>The user is not live.</p> */}
      {!data ? "loading" : data}
    </>
  );
}

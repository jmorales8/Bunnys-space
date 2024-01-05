// import GetTwitchStatus from '../../../../api/index'

import { useEffect, useState } from "react";
import { TwitchProfile } from "./TwitchProfile/TwitchProfile";

// const isLive = GetTwitchStatus();

export function Twitch() {
  return (
    <>
      <TwitchProfile />
    </>
  );
}

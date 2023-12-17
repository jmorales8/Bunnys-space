import React from "react";

export async function CheckIfLive(username: string): Promise<boolean> {
  try {
    const response = await fetch(`https://twitch.tv/${username}`, {mode: "no-cors"});
    const sourceCode = await response.text();

    if (sourceCode.includes("isLiveBroadcast")) {
      console.log(`${username} is live`);
      return true;
    }
    else {
      console.log(`${username} is not live`);
    }
  }
  catch (error) {
    console.log("Error occurred:", error);
  }
  return false;
}

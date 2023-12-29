const channelName = 'kaicenat';
export async function GetTwitchStatus() {
  let a = await fetch(`https://www.twitch.tv/${channelName}`);
  if ((await a.text()).includes('isLiveBroadcast')) {
    console.log("live");
    return true;
  } else {
    console.log("not live");
    return false;
  }
}

console.log(GetTwitchStatus());

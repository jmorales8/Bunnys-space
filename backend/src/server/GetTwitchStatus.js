// const channelName = 'caseoh_';
// const channelName = 'kaicenat';
const channelName = 'lacy';
export async function GetTwitchStatus() {
  let a = await fetch(`https://www.twitch.tv/${channelName}`);
  let isLive = false;
  if ((await a.text()).includes('isLiveBroadcast')) {
    isLive = true;
  } else {
    console.log("not live");
  }
  return isLive;
}

const channelName = 'pillow_senpai';
export async function GetTwitchStatus() {
    let a = await fetch(`https://www.twitch.tv/${channelName}`);
    if( (await a.text()).includes('isLiveBroadcast') )
        console.log("live")
    else
        console.log("not live")
}

GetTwitchStatus()
export default GetTwitchStatus;
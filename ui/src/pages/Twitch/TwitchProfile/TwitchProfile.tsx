import { useEffect, useState } from "react";
const text = "Anya Forger: The adopted daughter of Loid Forger and Yor Forger, who doesn't know she isn't Loid's biological daughter. She was used as an experiment by the Ostanian government that gave her the ability to read minds. She ended up"

export function TwitchProfile() {
  const [data, setData] = useState({ isLive: false });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/twitch/livestatus");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  let isUserLive = data.isLive;
  return (
    <div className="profile">
      {loading ? (
        <> loading </>
      ) : (
        <>
          {isUserLive ? (
            <div className="twitch__profile__online">
              <div className="twitch__profile__online__group">
                <div>Please click me u\\v\\u</div>
                <div className="twitch__profile__online__text__sides">
                  <div className="twitch__profile__online__text__sides__left">{"please click->"}</div>
                  <img
                    src="/images/bunnyL.jpg"
                    alt="live"
                    className="twitch__profile__online__icon"
                  />
                  <div className="twitch__profile__online__text__sides__right">
                    {"<-im begging"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="twitch__profile__offline">
              <div className="twitch__profile__offline__group">
                <img
                  src="/images/bunnyL.jpg"
                  alt="not live"
                  className="twitch__profile__offline__icon"
                />
                <div className="twitch__profile__offline__text">
                  Pillow aint streaming :c
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <hr className="twitch__profile__divider"/>
      <div className="twitch__profile__bio__text">
        <div>
        {text}
        </div>
      </div>
    </div>
  );
}

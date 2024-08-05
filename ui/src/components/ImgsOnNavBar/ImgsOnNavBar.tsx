import { useEffect, useRef, useState } from "react";

function RandomImage() {
  return Math.floor(Math.random() * 100);
}

function RandomSFX() {
  return Math.floor(Math.random() * 3);
}

const necoArcSFX: string[] = [
  "mudamuda",
  "necoarc-hello",
  "pretty-boy"
]

export function ImgsOnNavBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [currImage, setCurrImage] = useState(0);
  const [currentSFX, setCurrentSFX] = useState("");

  function revertImage() {
    setIsClicked(false);
  }

  const changePic = () => {
    const newImage = RandomImage();
    let newSFX;
    if(newImage === 0) {
      newSFX = "gokuUI";
    } else {
      newSFX = necoArcSFX[RandomSFX()];
    }
    setCurrImage(newImage);
    setCurrentSFX(newSFX);
    setIsClicked(true);
    setTimeout(revertImage, 1500);
  };

  useEffect(() => {
    if (isClicked && audioRef.current) {
      audioRef.current.src = `/audio/${currentSFX}.mp3`;
      audioRef.current.play();
    }
  }, [isClicked, currentSFX]);

  return (
    <>
      {!isClicked ? (
        <div className="navBar__picture" onClick={changePic} />
      ) : (
        <>
          {currImage === 0 ? (
            <>
              <audio ref={audioRef}>
                <source src={`/audio/${currentSFX}.mp3`} type="audio/mp3" />
              </audio>
              <div className="navBar__picture__gokufeet" />
            </>
          ) : (
            <>
              <audio ref={audioRef}>
                <source src={`/audio/${currentSFX}.mp3`} type="audio/mp3" />
              </audio>
              <div className="navBar__picture__necoarc" />
            </>
          )}
        </>
      )}
    </>
  );
}

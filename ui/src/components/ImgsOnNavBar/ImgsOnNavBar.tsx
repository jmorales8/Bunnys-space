import { useState } from "react";

function RandomImage() {
  return Math.floor(Math.random() * 100);
}

export function ImgsOnNavBar() {
  const [isClicked, setIsClicked] = useState(false);
  const [currImage, setCurrImage] = useState(0);
  function revertImage() {
    setIsClicked(false);
  }
  const changePic = () => {
    setCurrImage(RandomImage());
    setIsClicked(true);
    setTimeout(revertImage, 300);
  };

  return (
    <>
      {!isClicked ? (
        <div className="navBar__picture" onClick={changePic} />
      ) : (
        <>
          {currImage === 7 ? (
            <>
              <div className="navBar__picture__gokufeet" />
            </>
          ) : (
            <>
              <div className="navBar__picture__necoarc" />
            </>
          )}
        </>
      )}
    </>
  );
}

// import { useEffect, useMemo, useRef, useState } from "react";
// import {
//   BsFillPlayCircleFill,
//   BsFillPauseCircleFill,
//   BsFillSkipStartCircleFill,
//   BsSkipEndCircleFill,
//   BsFillSkipEndCircleFill,
// } from "react-icons/bs";
// import { Songs } from "./Songs";

// function RandomSound() {
//   return Math.floor(Math.random() * 4);
// }

// export function usePersistState<T>(initial_value: T, id: string): [T, (new_state: T) => void] {
//   const _initial_value = useMemo(() => {
//     const local_storage_value_str = localStorage.getItem('state:' + id);
//     // If there is a value stored in localStorage, use that
//     if(local_storage_value_str) {
//         return JSON.parse(local_storage_value_str);
//     }
//     // Otherwise use initial_value that was passed to the function
//     return initial_value;
//   }, []);
//   const [state, setState] = useState(_initial_value);
//   useEffect(() => {
//     const state_str = JSON.stringify(state); // Stringified state
//     localStorage.setItem('state:' + id, state_str) // Set stringified state as item in localStorage
//   }, [state]);
//   return [state, setState];
// }

// const Player = () => {
//   // const [ counter, setCounter ] = usePersistState(0, 'counter');
//   // return(
//   //   <>
//   //   <button onClick={() => setCounter(counter + 1)}> {counter} </button>
//   //   </>
//   // )
//   const audioElem = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setPlaying] = useState<boolean>(false);
//   const [currentSong, SetCurrentSong] = useState(Songs[1]);
//   const PlayPause = () => {
//     setPlaying(!isPlaying);
//   };
//   console.log("bruh")
//   useEffect(() => {
//     if (audioElem.current !== null) {
//       if (isPlaying) {
//         audioElem.current.play();
//       } else {
//         audioElem.current.pause();
//       }
//     }
//   }, [isPlaying]);
//   return (
//     <div className="player" style={{ color: "white" }}>
//       <div className="player__title">
//         <p>{currentSong.title}</p>
//       </div>
//       <div className="player__navigation">
//         <div className="player__navigation__navigation_wrapper">
//           <div
//             className="player__navigation__navigation_wrapper__seek_bar"
//             style={{ width: "50%" }}
//           ></div>
//         </div>
//       </div>
//       <div className="player__controls">
//         <BsFillSkipStartCircleFill className="player__controls__btn_action" />
//         {isPlaying ? (
//           <BsFillPauseCircleFill
//             className="player__controls__btn_action"
//             onClick={PlayPause}
//           />
//         ) : (
//           <BsFillPlayCircleFill
//             className="player__controls__btn_action"
//             onClick={PlayPause}
//           />
//         )}
//         <BsFillSkipEndCircleFill className="player__controls__btn_action" />
//       </div>
//       <audio ref={audioElem}>
//         <source src={`/audio/${currentSong.fileName}`} />
//       </audio>
//     </div>
//   );
// };

// export default Player;
import { useState, useEffect, useMemo, RefObject, useRef } from 'react';

export function usePersistState<T>(initialValue: T, id: string): [T, (newState: T) => void] {
  const _initialValue = useMemo(() => {
    const localStorageValueStr = localStorage.getItem('state:' + id);
    if (localStorageValueStr) {
      return JSON.parse(localStorageValueStr);
    }
    return initialValue;
  }, [id, initialValue]);

  const [state, setState] = useState<T>(_initialValue);

  useEffect(() => {
    const stateStr = JSON.stringify(state);
    localStorage.setItem('state:' + id, stateStr);
  }, [state, id]);

  return [state, setState];
}

export function usePersistAudioState(audioRef: RefObject<HTMLAudioElement>, initialVolume = 1) {
  const [isPlaying, setIsPlaying] = usePersistState(false, 'audio-is-playing');
  const [currentTime, setCurrentTime] = usePersistState(0, 'audio-current-time');
  const [volume, setVolume] = usePersistState(initialVolume, 'audio-volume');

  useEffect(() => {
    const audio = audioRef.current;
    if (audio !== null) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return {
    isPlaying,
    PlayPause,
    currentTime,
    volume,
    changeVolume
  };
}

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, PlayPause, volume, changeVolume } = usePersistAudioState(audioRef);

  return (
    <div>
      <audio ref={audioRef}>
        <source src='/audio/Flower_Garden.mp3' type="audio/mp3" />
      </audio>
      <button onClick={PlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      {/* <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
      /> */}
    </div>
  );
};

export default AudioPlayer;

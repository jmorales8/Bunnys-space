import { useState, useEffect, useMemo, RefObject, useRef, useContext } from 'react';
import { Songs } from './Songs';
import { ThemeContext } from '../../context/ThemeContext';

function RandomSong(): number {
  return Math.floor(Math.random() * Songs.length);
}

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
  const [isPlaying, setIsPlaying] = usePersistState<boolean>(false, 'audio-is-playing');
  const [volume, setVolume] = usePersistState<number>(initialVolume, 'audio-volume');

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [audioRef, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Audio play error:', error);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    setIsPlaying(false);
  }, [setIsPlaying]); // Reset isPlaying to false on component mount

  const togglePlayPause = () => {
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
    setIsPlaying,
    togglePlayPause,
    volume,
    changeVolume
  };
}

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, setIsPlaying, togglePlayPause, volume, changeVolume } = usePersistAudioState(audioRef);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(RandomSong());

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio play error:', error);
        });
      }
    }
  }, [currentSongIndex]);

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % Songs.length);
    setIsPlaying(true)
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + Songs.length) % Songs.length);
    setIsPlaying(true)
  };

  const currentSong = Songs[currentSongIndex];

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;

  return (
    <div className={isDarkMode ? "player__night" : "player"}>
      <audio ref={audioRef}>
        <source src={`/audio/${currentSong.fileName}`} type="audio/mp3" />
      </audio>
      <div className='player_container'>
        <div className={isDarkMode ? "player__title__night" : "player__title"}>
          {currentSong.title}
        </div>
        <div className="navigation">
          <div className="navigation__wrapper">
            <div className="seek_bar" style={{ width: "50%" }}></div>
          </div>
        </div>
        <div className="player__controls">
          <img src="/images/left_skip.png" className='player__controls__btn__action' onClick={prevSong} alt="left_skip"/>
          {isPlaying ? <img src="/images/pause_music.png" className='player__controls__pp' onClick={togglePlayPause} alt="pause" /> : <img src="/images/play_music.png" className='player__controls__pp' onClick={togglePlayPause} alt="play"/>}
          <img src="images/right_skip.png" className='player__controls__btn__action' onClick={nextSong} alt="right_skip"/>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        className="bruh"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default AudioPlayer;

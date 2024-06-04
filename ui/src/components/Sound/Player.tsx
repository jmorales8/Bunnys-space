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
    if (audio) {
      audio.volume = volume;
      audio.currentTime = currentTime;

      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef, volume, setCurrentTime]);

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
    const handleBeforeUnload = () => {
      const audio = audioRef.current;
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [audioRef, setCurrentTime]);

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
    togglePlayPause,
    currentTime,
    volume,
    changeVolume
  };
}

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, togglePlayPause, volume, changeVolume } = usePersistAudioState(audioRef);

  return (
    <div>
      <audio ref={audioRef} preload="auto">
        <source src='/audio/Flower_Garden.mp3' type="audio/mp3" />
      </audio>
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default AudioPlayer;

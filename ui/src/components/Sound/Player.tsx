import { useEffect, useRef, useState } from "react"
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

const Sounds: string[] = ["Flower_Garden.mp3", "Chao_Race_Extended_Mix.mp3", "Map_BGM.mp3", "Live_And_Learn.mp3"]

function RandomSound() {
  return Math.floor(Math.random() * 4)
}

const Player = () => {
  const audioElem = useRef<HTMLAudioElement>(null);
  const [ isPlaying, setPlaying ] = useState<boolean>(false);
  const [ currentSong, SetCurrentSong ] = useState<string>(Sounds[0]);
  const PlayPause = () => {
    setPlaying(!isPlaying);
  }
  useEffect(() => {
    if(audioElem.current !== null){
      if(isPlaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause()
      }
    }
  }, [isPlaying])
  return (
    <div className='player' style={{color: "white"}}>
      <div className="player__title">
        <p>First song</p>
      </div>
      <div className="player__navigation">
        <div className="player__navigation__navigation_wrapper">
          <div className="player__navigation__navigation_wrapper__seek_bar" style={{width: '50%'}}></div>
        </div>
      </div>
      <div className="player__controls">
        <BsFillSkipStartCircleFill className='player__controls__btn_action' />
        <BsFillPauseCircleFill className='player__controls__btn_action' onClick={PlayPause}/>
        <BsFillSkipEndCircleFill className='player__controls__btn_action' />
      </div>
      <audio ref={audioElem}>
        <source src={`/audio/${Sounds[RandomSound()]}`} />
      </audio>
    </div>

  )
}

export default Player
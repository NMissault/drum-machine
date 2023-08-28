import './App.css';
import { useEffect, useState } from 'react';

const audioSamples1= [
  {
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  }, 
  {
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  }, 
  {
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  }, 
  {
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  }, 
  {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  }, 
  {
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  }, 
  {
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }];
const audioSamples2 = [{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}];

const soundKit = {
  heaterKit: "Heater Kit",
   smoothPianoKit: "Smooth Piano Kit"
  };

const soundGroup = {
  heaterKit: audioSamples1, 
  smoothPianoKit: audioSamples2
};

const KeyboardKey = ({play, sound: {keyCode, keyTrigger, id, url} }) => {
  const handleKeydown = (event) => {
    if (event.keyCode === keyCode){
      play(keyTrigger, id)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
  },[])

  return (
    <button className="drum-pad" id={id} onClick={() => play(keyTrigger, id)}>
      <audio className="clip" src={url} id={keyTrigger}></audio>
      {keyTrigger}
    </button>
    )
}

const Keyboard = ({power, play, sounds}) => (
  <div className='keyboard'>
    {power 
    ? sounds.map((sound) => <KeyboardKey play={play} sound={sound}/>) 
    : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound, url: '#'}}/>)
    }
  </div>
)

const DrumControls = ({switchPower, power, volume, handleVolumeChange, name, switchSoundBank}) => (
    <div className='controls'>
      <button onClick={switchPower}>Power {power ? "OFF" : "ON"}</button>
      <h2>Volume: {Math.round(volume*100)}%</h2>
      <input
      max="1"
      min="0"
      step="0.01"
      type="range"
      value={volume}
      onChange={handleVolumeChange}
      />
      <h2>{name}</h2>
      <button onClick={switchSoundBank}>Bank</button>
    </div>
)

const App = () => {
  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(1);
  const [soundName, setSoundName] = useState("");
  const [soundType, setSoundType] = useState("heaterKit");
  const [sounds, setSounds] = useState(soundGroup[soundType]);

  const switchPower = () => {
    setPower(!power)
  };

  const styleActiveKey = (audio) => {
    audio.parentElement.style.backgroundColor = '#000000'
    audio.parentElement.style.color = '#ffffff'
  };

  const resetStyle = (audio) => {
    setTimeout(()=>{
      audio.parentElement.style.backgroundColor = '#ffffff'
      audio.parentElement.style.color = '#000000'
    }, 300)
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  };

  const play = (keyTrigger, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(keyTrigger);
    styleActiveKey(audio)
    audio.currentTime = 0;
    audio.play();
    resetStyle(audio)
  };

  const switchSoundBank = () => {
    if(soundType === "heaterKit"){
      setSoundType("smoothPianoKit")
      setSounds(soundGroup.smoothPianoKit)
      setSoundName("")
    } else {
      setSoundType("heaterKit")
      setSounds(soundGroup.heaterKit)
      setSoundName("")
    }
  };

  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.keyTrigger))
    audios.forEach(audio => {
      if(audio) {
        audio.volume = volume
      }
    })
  };

  return (
    <div className="App" id="drum-machine">
      {setKeyVolume()}
      <div id="display" className='wrapper'>
        <Keyboard 
        power={power}
        play={play} 
        sounds={sounds}
        />
        <DrumControls 
        switchPower={switchPower}
        power={power}
        volume={volume} 
        handleVolumeChange={handleVolumeChange}
        name={soundName || soundKit[soundType]} 
        switchSoundBank={switchSoundBank}
        />
      </div>
    </div>
  );
}

export default App;

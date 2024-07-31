import './App.css';
import React, { useState } from 'react';
import SequencePlayer from './components/SequencePlayer';
// import DragDropArea from './DragDropArea';
import drumSound from './sounds/drum.wav';
import guitarSound from './sounds/guitar.wav';
import pianoSound from './sounds/piano.wav';
import DragDropArea from './components/DragDropArea';

const App = () => {
  const [sequence, setSequence] = useState([]);
  const instruments = [
    { id: 1, name: 'Drum', image: '/instruments/drum.png', sound: drumSound },
    { id: 2, name: 'Guitar', image: '/instruments/guitar.png', sound: guitarSound },
    { id: 3, name: 'Piano', image: '/instruments/piano.png', sound: pianoSound }
  ];

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < 3; i++) {
      const randomInstrument = instruments[Math.floor(Math.random() * instruments.length)];
      newSequence.push(randomInstrument);
    }
    console.log(newSequence)
    setSequence(newSequence);
  };
  
  return (
    <div className="app">
      <button onClick={generateSequence}>Start</button>
      <SequencePlayer sequence={sequence} />
      <DragDropArea instruments={instruments} sequence={sequence} />
    </div>
  );
};

export default App;

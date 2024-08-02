import './App.css';
import React, { useState } from 'react';
import SequencePlayer from './components/SequencePlayer';
import drumSound from './sounds/drum.wav';
import guitarSound from './sounds/guitar.wav';
import pianoSound from './sounds/piano.wav';
import InstrumentBoard from './components/InstrumentBoard';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [sequence, setSequence] = useState([]);
  const [showBoard, setShowBoard] = useState(false);

  const instruments = [
    { id: 1, name: 'Drum', image: '/instruments/drum.png', sound: drumSound },
    { id: 2, name: 'Guitar', image: '/instruments/guitar.png', sound: guitarSound },
    { id: 3, name: 'Piano', image: '/instruments/piano.png', sound: pianoSound }
  ];

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < 8; i++) {
      const randomInstrument = instruments[Math.floor(Math.random() * instruments.length)];
      newSequence.push(randomInstrument);
    }
    console.log(newSequence);
    setSequence(newSequence);
    setShowBoard(false);
  };

  const handleSequenceEnd = () => {
    setShowBoard(true); // Show board when sequence ends
  };

  return (
    // <DndProvider backend={HTML5Backend}>
    <div className="app">
      {!showBoard ? (
        <>
          <button onClick={generateSequence}>Start</button>
          <SequencePlayer sequence={sequence} onEnd={handleSequenceEnd} />
        </>
      ) : (
        <InstrumentBoard sequence={sequence} />
      )}
    </div>
    // </DndProvider>
  );
};

export default App;

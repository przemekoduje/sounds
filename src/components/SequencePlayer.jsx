import React, { useEffect, useState } from 'react';

const SequencePlayer = ({ sequence, onEnd }) => {

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  const playSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      setIsVisible(true)
      setCurrentIndex(i);
      const instrument = sequence[i];
      const audio = new Audio(instrument.sound);
      await audio.play();
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsVisible(false);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setCurrentIndex(-1);
    if (onEnd) onEnd();
  };

  return (
    <div className="sequence-player">
      {sequence.map((instrument, index) => (
        <img 
          key={index} 
          src={instrument.image} 
          alt={instrument.name} 
          className='instruments-sequence'
          style={{
            display: index === currentIndex && isVisible ? 'block' : 'none',
            transition: 'opacity 0.5s', // Płynne znikanie i pojawianie się obrazka
            opacity: isVisible ? 1 : 0,
          }}
          />
      ))}
    </div>
  );
};

export default SequencePlayer;

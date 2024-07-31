import React, { useEffect } from 'react';

const SequencePlayer = ({ sequence }) => {
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  const playSequence = async () => {
    for (const instrument of sequence) {
      const audio = new Audio(instrument.sound);
      await audio.play();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="sequence-player">
      {sequence.map((instrument, index) => (
        <img key={index} src={instrument.image} alt={instrument.name} />
      ))}
    </div>
  );
};

export default SequencePlayer;

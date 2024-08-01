import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropArea from './dropArea';

const Instrument = ({ instrument }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'instrument',
    item: { id: instrument.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [instrument]);

  return (
    <img
      ref={drag}
      src={instrument.image}
      alt={instrument.name}
      style={{
        position: 'absolute',
        left: instrument.position.x,
        top: instrument.position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        maxWidth: '50px',
        maxHeight: '50px',
        width: 'auto',
        height: 'auto',
      }}
    //   draggable={false} // Zapobiega domyślnemu działaniu
    //   onDragStart={(e) => e.preventDefault()} // Zapobiega domyślnemu działaniu
    />
  );
};

const InstrumentBoard = ({ instruments, sequence }) => {
  const [items, setItems] = useState([]);
  const [userSequence, setUserSequence] = useState([]);

  useEffect(() => {
    console.log("Received sequence in InstrumentBoard: ", sequence);
    const randomPositions = instruments.map(inst => ({
      ...inst,
      position: {
        x: Math.floor(Math.random() * (window.innerWidth - 100)),
        y: Math.floor(Math.random() * (window.innerHeight - 100)),
      },
      
    }));
    console.log("Instruments positiopn: ", randomPositions);
    setItems(randomPositions);
  }, [instruments]);

  const handleDrop = (item) => {
    const instrument = items.find((inst) => inst.id === item.id);

    setUserSequence((prevSequence) => [...prevSequence, instrument]);

    setItems((prevItems) => prevItems.filter((inst) => inst.id !== item.id));

    if (userSequence.length + 1 === sequence.length) {
      const isCorrect = userSequence.every((inst, index) => inst.id === sequence[index].id);
      if (isCorrect && instrument.id === sequence[userSequence.length].id) {
        console.log('Dobra robota!');
      } else {
        console.log('Spróbuj ponownie!');
        setUserSequence([]);
        setItems((prevItems) => [...prevItems, ...userSequence, instrument]);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="instrument-board" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <DropArea onDrop={handleDrop} />
        {items.map((instrument) => (
          <Instrument key={instrument.id} instrument={instrument} />
        ))}
      </div>
    </DndProvider>
  );
};

export default InstrumentBoard;

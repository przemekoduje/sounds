import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropArea from './dropArea';

const Instrument = ({ instrument }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'instrument',
    item: { id: instrument.uniqueId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
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
        zIndex: isDragging ? 2 : 1,
      }}
    />
  );
};

const InstrumentBoard = ({ sequence }) => {
  const [items, setItems] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [droppedInstruments, setDroppedInstruments] = useState([]);
  const dropAreaRef = useRef(null); // Ref to get DropArea position

  useEffect(() => {
    console.log("Received sequence in InstrumentBoard: ", sequence);
    
    const instrumentCount = {};
    const randomPositions = sequence.map(inst => {
      const count = instrumentCount[inst.id] || 0;
      instrumentCount[inst.id] = count + 1;

      return {
        ...inst,
        uniqueId: `${inst.id}-${count}`, // Ensure unique ID for each instrument instance
        position: {
          x: Math.floor(Math.random() * (window.innerWidth - 100)),
          y: Math.floor(Math.random() * (window.innerHeight - 100)),
        },
      };
    });
    console.log("Instruments position: ", randomPositions);
    setItems(randomPositions);
  }, [sequence]);

  const handleDrop = (item, monitor) => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const dropAreaRect = dropArea.getBoundingClientRect();
    const dropPosition = monitor.getClientOffset();
    
    console.log('Dropped item in InstrumentBoard:', items);
    const instrument = items.find((inst) => inst.uniqueId === item.id);
    console.log('Found instrument in items:', instrument);

    const updatedInstrument = {
      ...instrument,
      position: {
        x: dropPosition.x - dropAreaRect.left - 25, // Adjusting for icon size and DropArea offset
        y: dropPosition.y - dropAreaRect.top - 25,
      }
    };

    setUserSequence((prevSequence) => [...prevSequence, instrument]);
    setDroppedInstruments((prevDropped) => [...prevDropped, updatedInstrument]);
    setItems((prevItems) => prevItems.filter((inst) => inst.uniqueId !== item.id));

    if (userSequence.length + 1 === sequence.length) {
      const isCorrect = userSequence.every((inst, index) => inst.id === sequence[index].id);
      if (isCorrect && instrument.id === sequence[userSequence.length].id) {
        console.log('Dobra robota!');
      } else {
        console.log('Spróbuj ponownie!');
        setUserSequence([]);
        setDroppedInstruments([]);
        setItems((prevItems) => [...prevItems, ...userSequence, instrument]);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="instrument-board" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <DropArea ref={dropAreaRef} onDrop={handleDrop} droppedInstruments={droppedInstruments} />
        {items.map((instrument) => (
          <Instrument key={instrument.uniqueId} instrument={instrument} />
        ))}
      </div>
    </DndProvider>
  );
};

export default InstrumentBoard;

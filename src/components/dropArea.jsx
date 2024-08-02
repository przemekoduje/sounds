import React, { forwardRef } from 'react';
import { useDrop } from 'react-dnd';

const DropArea = forwardRef(({ onDrop, droppedInstruments }, ref) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'instrument',
    drop: (item, monitor) => {
      console.log('Item dropped:', item); // Sprawdzanie, czy przedmiot jest poprawnie przekazywany
      onDrop(item, monitor);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [onDrop]);

  return (
    <div
      ref={(node) => {
        drop(node);
        ref.current = node; // Setting ref for DropArea
      }}
      className="drop-area"
      style={{
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '2px dashed #000',
        backgroundColor: isOver ? '#d0f0c0' : '#f0f0f0',
        zIndex: 1,
      }}
    >
      {droppedInstruments.map((instrument) => (
        <img
          key={instrument.uniqueId}
          src={instrument.image}
          alt={instrument.name}
          style={{
            position: 'absolute',
            left: instrument.position.x,
            top: instrument.position.y,
            width: '50px',
            height: '50px',
          }}
        />
      ))}
    </div>
  );
});

export default DropArea;

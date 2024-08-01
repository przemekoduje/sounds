import React from 'react';
import { useDrop } from 'react-dnd';

const DropArea = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'instrument',
    drop: (item) => {
      console.log('Item dropped:', item); // Sprawdzanie, czy przedmiot jest poprawnie przekazywany
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [onDrop]);

  return (
    <div
      ref={drop}
      className="drop-area"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '2px dashed #000',
        backgroundColor: isOver ? '#d0f0c0' : '#f0f0f0',
        zIndex: 1,
      }}
    />
  );
};

export default DropArea;

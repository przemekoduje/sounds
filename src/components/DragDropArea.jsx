import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Instrument = ({ instrument }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'instrument',
    item: { id: instrument.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging)

  return (
    <img
      ref={drag}
      src={instrument.image}
      alt={instrument.name}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />
  );
};

const DropZone = ({ onDrop, accept }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? 'lightgreen' : 'lightgrey',
        height: '100px',
        width: '100px',
        margin: '10px',
      }}
    />
  );
};

const DragDropArea = ({ instruments, sequence }) => {
  const [userSequence, setUserSequence] = useState([]);

  const handleDrop = (item) => {
    const instrument = instruments.find((inst) => inst.id === item.id);
    setUserSequence([...userSequence, instrument]);
  };

  const checkSequence = () => {
    const isCorrect = userSequence.every((inst, index) => inst.id === sequence[index].id);
    if (isCorrect) {
      alert('Dobra robota!');
    } else {
      alert('Spróbuj ponownie!');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="drag-drop-area">
        <div className="drop-zones">
          {sequence.map((_, index) => (
            <DropZone key={index} onDrop={handleDrop} accept="instrument" />
          ))}
        </div>
        <div className="instruments">
          {instruments.map((instrument) => (
            <Instrument key={instrument.id} instrument={instrument} />
          ))}
        </div>
        <button onClick={checkSequence}>Sprawdź</button>
      </div>
    </DndProvider>
  );
};

export default DragDropArea;

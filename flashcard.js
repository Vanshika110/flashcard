import React, { useState } from 'react';
import './flashcard.css';

function Flashcard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleFlip} style={styles.flashcard}>
      {isFlipped ? flashcard.answer : flashcard.question}
    </div>
  );
}

const styles = {
  flashcard: {
    width: '300px',
    height: '200px',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.3s',
  },
};

export default Flashcard;

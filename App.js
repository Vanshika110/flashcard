import React, { useState } from 'react';
import Flashcard from './flashcard.css';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([
    { question: 'What is React?', answer: 'A JavaScript library for building UIs' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript' },
    { question: 'What is a component?', answer: 'Reusable pieces of UI in React' },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0));
  };

  const resetFlashcards = () => {
    setCurrentIndex(0);
  };

  const handleAddFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setFlashcards([...flashcards, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const handleDeleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
    if (currentIndex >= updatedFlashcards.length) {
      setCurrentIndex(updatedFlashcards.length - 1);
    }
  };

  const handleEditFlashcard = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewQuestion(flashcards[index].question);
    setNewAnswer(flashcards[index].answer);
  };

  const handleUpdateFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const updatedFlashcards = flashcards.map((card, i) => 
        i === editIndex ? { question: newQuestion, answer: newAnswer } : card
      );
      setFlashcards(updatedFlashcards);
      setNewQuestion('');
      setNewAnswer('');
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  return (
    <div className="container">
      {flashcards.length > 0 ? (
        <Flashcard flashcard={flashcards[currentIndex]} />
      ) : (
        <div>No flashcards available.</div>
      )}
      <div className="navigation">
        <button onClick={goToPrevious} className="button" disabled={flashcards.length === 0}>Previous</button>
        <button onClick={resetFlashcards} className="button" disabled={flashcards.length === 0}>Reset</button>
        <button onClick={goToNext} className="button" disabled={flashcards.length === 0}>Next</button>
      </div>
      <div className="progress">
        Flashcard {flashcards.length > 0 ? currentIndex + 1 : 0} of {flashcards.length}</div>
        <div className="form">
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="input"
        />
        {isEditing ? (
          <button onClick={handleUpdateFlashcard} className="button">Update Flashcard</button>
        ) : (
          <button onClick={handleAddFlashcard} className="button">Add Flashcard</button>
        )}
      </div>
<div className="flashcard-list">
        {flashcards.map((flashcard, index) => (
          <div key={index} className="flashcard-item">
            <span>{flashcard.question}</span>
            <button onClick={() => handleEditFlashcard(index)} className="button edit-button">Edit</button>
            <button onClick={() => handleDeleteFlashcard(index)} className="button delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizQuestions = () => {
  const [questions, setQuestions] = useState([]); // Store all questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Keep track of the current question index
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selected,setSelected]=useState('');
 const navigate=useNavigate();
  const handleselection=(option)=>{
    setSelected(option)
  }
  // Fetch all questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://648435f7ee799e3216266192.mockapi.io/quiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
         
        });
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data); // Set all questions in state
        setLoading(false); // Stop loading
      } catch (error) {
        setError(error.message);
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchQuestions();
  }, []);

  // Delete the current question
  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(`https://648435f7ee799e3216266192.mockapi.io/quiz/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the question from the list after successful deletion
        const updatedQuestions = questions.filter((q, index) => index !== currentQuestionIndex);
        setQuestions(updatedQuestions);

        // Show the next question (or the previous one if it was the last question)
        if (currentQuestionIndex >= updatedQuestions.length) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      } else {
        alert('Failed to delete the question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Error deleting question. Please try again.');
    }
  };

  // Show the next question when the user clicks "Next"
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      alert('No more questions');
    }
  };
    //update function
    const updatequest=()=>{
      Navigate('/update')
    }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (questions.length === 0) return <p>No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question to display

  return (
    <div>
      <h1>Quiz Questions</h1>
      
      <div>
        <strong>Question {currentQuestionIndex + 1}: </strong> {currentQuestion.questionText}
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li key={index}  style={{
              display: 'inline-block',
              width: '48px',
              padding: '8px',
              margin: '4px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              border: '1px solid #ccc'
            }}>{String.fromCharCode(97 + index)}: {option}</li>
          ))}
        </ul>

        <button onClick={() => handleDelete(currentQuestion.id)}>Delete</button> {/* Delete the current question */}
        <button onClick={handleNextQuestion}>Next Question</button> {/* Go to the next question */}
        <button onClick={updatequest}>update</button>
      </div>
    </div>
  );
};

export default QuizQuestions;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizQuestions = () => {
  const [questions, setQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [quizFinished, setQuizFinished] = useState(false); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const navigate = useNavigate();

  
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
        console.log('Fetched Questions:', data); 
        setQuestions(data); 
        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false); 
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(`https://648435f7ee799e3216266192.mockapi.io/quiz/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
        setQuestions(updatedQuestions);

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

  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); 
    } else {
      setQuizFinished(true); 
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index); 
  };

  const updateQuest = () => {
    const questionToUpdate = questions[currentQuestionIndex];
    navigate('/update', { state: { question: questionToUpdate } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (quizFinished) return <h2>Quiz Finished! Thank you for participating!</h2>;

  if (questions.length === 0) return <p>No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];
  console.log('Current Question:', currentQuestion); 

  return (
    <div className='quiz-main'>
      <h1>Quiz Questions</h1>

      <div className='quiz-display'>
        <strong>Question {currentQuestionIndex + 1}: {currentQuestion.questionText || currentQuestion.question || currentQuestion.text || 'No question text'} </strong> 
        <ul className='options-list'>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              style={{
                display: 'inline-block',
                width: '250px',
                padding: '8px',
                margin: '4px',
                cursor: 'pointer',
                borderRadius:"15px",
                backgroundColor: selectedOption === index ? 'orange' : 'transparent',
                border: selectedOption === index ? '2px solid black' : '1px solid #ccc',
                color: selectedOption === index ? 'white' : 'black', 
              }}
              onClick={() => handleOptionClick(index)} 
            >
              {String.fromCharCode(97 + index)}: {option}
            </li>
          ))}
        </ul>

      <div className='btns'>
      <button onClick={() => handleDelete(currentQuestion.id)} className='btn'>Delete</button>
        <button onClick={handleNextQuestion} className='btn'>Next Question</button>
        <button onClick={updateQuest} className='btn'>Update</button>
      </div>
      </div>
    </div>
  );
};

export default QuizQuestions;

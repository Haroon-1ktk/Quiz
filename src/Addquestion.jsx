import React, { useState } from 'react';
import Formcomponent from './Formcomponent';
import { useNavigate } from 'react-router-dom';

const Addquestion = () => {
  const [showtext, setShowtext] = useState(true);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [questionText, setQuestionText] = useState('');
  
  const history=useNavigate();
 
  const handleClick = () => {
    setShowtext(!showtext);
  };

  
  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  
  const postQuizData = async (quizData) => {
    try {
      const response = await fetch('https://648435f7ee799e3216266192.mockapi.io/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData), 
      });

      if (response.ok) {
        const data = await response.json();
        alert('Quiz successfully submitted!');
        console.log('Response:', data);
      } else {
        alert('Failed to submit quiz.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz. Please try again.');
    }
   history('/');
  };

 
  const onSubmitquiz = async () => {
    if (questionText.trim() && options.every(option => option.trim())) {
      const quizData = {
        question: questionText,
        options: options,
      };
      await postQuizData(quizData); 
    } else {
      alert('Please fill the question and all options.');
    }
  };

  return (
    <div>
      <form action="" className="layout">
        {!showtext ? (
          <div>
            <span
              onClick={handleClick}
              style={{ marginRight: "50px", fontSize: "20px", cursor: 'pointer' }}
            >
              -
            </span>
            <label htmlFor="addQuestion"></label>
            <textarea
              name="question"
              id="question"
              value={questionText}
              onChange={handleQuestionChange}
            ></textarea>
          </div>
        ) : (
          <span
            onClick={handleClick}
            style={{ marginRight: "50px", fontSize: "20px", cursor: 'pointer' }}
          >
            ?
          </span>
        )}

        <div>
          <strong>Preview: </strong> {questionText} 
          <ul>
            {options.map((option, index) => (
              <div className="optionspreview" key={index}>
                <span>{String.fromCharCode(97 + index)}:</span>
                <span>{option}</span>
              </div>
            ))}
          </ul>
        </div>

        <Formcomponent options={options} setOptions={setOptions} question={questionText} />

        <button type="button" onClick={onSubmitquiz}>
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default Addquestion;

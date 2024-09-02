import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { question } = location.state || {}; 

  const [questionText, setQuestionText] = useState(question?.questionText || '');
  const [options, setOptions] = useState(question?.options || []);

  const handleOptionChange = (index, newValue) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    setOptions(newOptions);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://648435f7ee799e3216266192.mockapi.io/quiz/${question.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionText,
          options,
        }),
      });

      if (response.ok) {
        alert('Question updated successfully!');
        navigate('/');
      } else {
        alert('Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Error updating question. Please try again.');
    }
  };

  return (
    <div  className='quiz-main'>
      <h1>Update Question</h1>
      <form onSubmit={handleUpdateSubmit} className='form'>
        <label>
          Question:
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
         id='question' />
        </label>
        <h3>Options:</h3>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateForm;

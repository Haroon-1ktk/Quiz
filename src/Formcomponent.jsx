import React from 'react';

const Formcomponent = ({ options, setOptions, question }) => {
 
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions); 
  };

  return (
    <div>
      <h3>Options for: {question}</h3>
      {options.map((option, index) => (
        <label key={index} htmlFor="">
          {String.fromCharCode(97 + index)}
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </label>
      ))}
    </div>
  );
};

export default Formcomponent;

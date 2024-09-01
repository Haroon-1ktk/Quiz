import React from 'react'

const Formcomponent = ({options,setOptions}) => {
  const handleOptions=()=>{
  const allOptions=[...options];
    setOptions(options)
  }
  return (
    <div>
      <input type="text" name='options' id="options" value={options} onChange={handleOptions}/>
      <input type="text" name='options' id="options" value={options} onChange={handleOptions}/>
      <input type="text" name='options' id="options" value={options} onChange={handleOptions}/>
    </div>
  )
}

export default Formcomponent
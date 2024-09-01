import React, { useState } from 'react'
import Formcomponent from './Formcomponent';
const Addquestion = () => {
    //show question textarea
    const [showtext,setShowtext]=useState(true);
    const [options,setOptions]=useState([]);
    const [question,setQuestion]=useState("");
    const handleCLick=()=>{
        setShowtext(!showtext)
    }
  return (
    <div>
    <form action="" className='layout'> 
    {!showtext? <div> 
        <span onClick={handleCLick} style={{marginRight:"50px", fontSize:"20px", cursor:'pointer'}}>-</span>
    <label htmlFor="add Question"></label>
    <textarea name="question" id="question" value={question} onChange={(e)=>setQuestion(e.target.value||e.target.id)}></textarea>
      </div>
      :<span onClick={handleCLick} style={{marginRight:"50px", fontSize:"20px", cursor:'pointer'}}>?</span>}
    <div>Preview: {question}
       <ul>
       {options.map((option,index)=>{
            return(
                <>
                <li>{index}{option}</li>
                </>
            )
        })}
       </ul>
    </div>
    <Formcomponent options={options} setOptions={setOptions}/>
    </form>

    </div>
  )
}

export default Addquestion
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
    <Link to={'/addquestion'}><span>Add Question</span></Link>
    <Link to={'/'}><span>Quiz</span></Link>
    </nav>
  )
}

export default Navbar
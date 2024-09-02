import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
    <Link to={'/addquestion'}className='navbar'>Add Question</Link>
    <Link to={'/'} className='navbar'>Quiz</Link>
    </nav>
  )
}

export default Navbar
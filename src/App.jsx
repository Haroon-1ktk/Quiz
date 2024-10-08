import './App.css';
import Addquestion from './Addquestion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import Navbar from './Navbar';
import UpdateForm from './UpdateForm';

const App=()=>{
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Quiz/>}/>
      <Route path='/addquestion' element={<Addquestion/>}/>
      <Route path='/update' element={<UpdateForm/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;
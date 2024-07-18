// import { useState } from 'react'
import Login from './login.jsx'
import Register from './register.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  
  return(
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login></Login>}/>
          <Route path='/register' exact element={<Register></Register>} />
        </Routes>
      </Router>
    </>
  );
}

export default App

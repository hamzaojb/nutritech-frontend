import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<Home />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

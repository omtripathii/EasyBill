import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import List from './list'
import Add from './add'
import Invoice from './invoice'
import './index.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/add' element={<Add />} />
          <Route path='/:id' element={<Invoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


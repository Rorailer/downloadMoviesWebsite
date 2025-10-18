import { useEffect, useState } from 'react'
import Home from './webpages/Home.jsx'
import Details from './webpages/Details.jsx'

import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <> 
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App


import './App.css';
// import { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar';
import NoteState from './context/notes/NoteState'
import Login from './component/Login';
import Notes from './component/Notes';
import Signup from './component/Signup';


function App() {
  return (
    <>
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Notes/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
      
      </NoteState>
    </>
  );
}

export default App;

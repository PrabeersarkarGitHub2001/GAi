import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Home from './Component/Home';
import "./App.css";
import ProtectedRoute from './ProtectedRoute';
import ChatApp from './Component/ChatApp';
import Search from './Component/Search';
import { ThemeProvider } from './Component/ThemeContext';
// import Accordian from './PracticeComponent/Accordian';
import CustomDropdown from './PracticeComponent/CustomDropdown';
import All from './PracticeComponent/All';
function App() {
  return (
    <ThemeProvider>

    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search/>}/>
        <Route path='/all' element={<All/>}/>

        <Route path='/home' element={<CustomDropdown />} />

        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </Router>
    </ThemeProvider>

  );
}

export default App;
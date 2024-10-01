import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css'
import FileUploadComponent from './FileUploadComponent/FileUploadComponent';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './LoginPage/SignUpPage';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
      <div className="App">
        <header className="App-header">
          <h1>Spending Trends</h1>
        </header>
        <div>
          <h2>Ready to start analyzing your spending?</h2>
          <p>Upload the bank statements you'd like insights on</p>
          <FileUploadComponent/>
        </div>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
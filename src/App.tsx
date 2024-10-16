import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css'
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './LoginPage/SignUpPage';
import PrivateRoute from './AuthorizationComponent';
import DisplayDataComponent from './DisplayDataComponent/DisplayDataComponent';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user')
  const logout = async () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
      <div className="App">
        <header className="App-header">
          <h1>Spending Trends </h1>
          <button className='logout' onClick={logout}>Logout</button>
        </header>
        <div>
          <h2>Welcome {user}, ready to start analyzing your spending?</h2>
          <p>Upload the bank statements you'd like insights on</p>
        </div>
        <DisplayDataComponent/>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home /> 
          </PrivateRoute>
        }/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
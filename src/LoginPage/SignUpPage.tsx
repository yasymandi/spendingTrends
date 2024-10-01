import React, { useState } from 'react';
import { signUp } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp(username, password);
      setSuccessMessage("Account creation successful!");
      navigate('/login');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="login-box">
          <label htmlFor="username" className="login-box">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="login-box">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!successMessage && errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpPage;

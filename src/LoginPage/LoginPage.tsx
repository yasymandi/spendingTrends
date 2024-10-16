import React, { useState } from 'react';
import { login } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginInfo = await login(username, password);
      localStorage.setItem('accessToken', loginInfo.access);
      localStorage.setItem('refreshToken', loginInfo.refresh);
      localStorage.setItem('user', username);
      navigate('/');
  
    }
    catch (error) {
      console.log(error);
      setErrorMessage("Error logging in, try again.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
};

export default LoginPage;

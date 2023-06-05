import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [inputString, setInputString] = useState('');
  const [queryResult, setQueryResult] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false); // New state variable

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3001/auth/signup', {
        email,
        password,
      });
      alert('Signup successful');
      setIsSignupMode(false);
    } catch (error) {
      alert('Signup failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      setToken(response.data.token);
      setLoggedIn(true);
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleQuery = async () => {
    try {
      const response = await axios.post('http://localhost:3001/query', {
        token,
        inputString: inputString,
      });
      console.log(response.data.username);
      setQueryResult(response.data.username);
    } catch (error) {
      alert('Query failed');
    }
  };

  const toggleSignupMode = () => {
    setIsSignupMode(!isSignupMode);
  };

  if (loggedIn) {
  return (
    <div className="App">
      <h1>Query User</h1>
      <div className="query-area">
        <div className="input-container">
          <label htmlFor="queryInput" className="input-label">
            Question
          </label>
          <textarea
            id="queryInput"
            placeholder="Enter any query..."
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="query-input"
          />
        </div>
        <div className="query-btn-container">
          <button onClick={handleQuery} className="query-btn-small">
            Submit
          </button>
        </div>
      </div>
      <div className="result-area">
        <label htmlFor="result-output" className="output-label">
          Result
        </label>
        <p id="result-output">{queryResult}</p>
      </div>
    </div>
  );
}
return (
  <div className="App">
    <div className="login-page">
      <div className="form">
        {!isSignupMode ? (
          <>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button onClick={handleLogin} className="login-btn">
              Login
            </button>
            <p>
              Don't have an account?{' '}
              <button className="signup-link" onClick={toggleSignupMode}>
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h1>Signup</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button onClick={handleSignup} className="signup-btn">
              Signup
            </button>
            <p>
              Already have an account?{' '}
              <button className="signup-link" onClick={toggleSignupMode}>
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default App;
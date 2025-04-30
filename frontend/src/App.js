import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './utils/Navbar';
import { useNavigate } from 'react-router-dom'; 
import Footer from './utils/Footer';
import lock from "./img/padlock.svg"

function App() {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const [isInvalid, setIsInvalid] = useState(false); // Track invalidity of input
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailOrMobile') {
      setEmailOrMobile(value);
      setIsInvalid(false); // Reset invalid state when user types
      setError(''); // Clear the error message as soon as user starts typing
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const validateMobileNumber = (mobile) => {
    return mobile.length === 10 && /^[0-9]+$/.test(mobile);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();                   //prevent its default submission behaviour as we need to do some validation or some operation here

    if (!validateMobileNumber(emailOrMobile) && !validateEmail(emailOrMobile)) {
      setError('Please enter a valid phone number/email');
      setIsInvalid(true); // Set the invalid flag to true
      return;
    }

    const url = 'http://localhost:5000/api/login';
    const payload = { email: emailOrMobile, mobile: emailOrMobile, password };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setResponseMessage('Login successful!');
        localStorage.setItem('token', response.data.token);
        
        const username = emailOrMobile.includes('@') ? emailOrMobile.split('@')[0] : emailOrMobile.slice(0,5);
        localStorage.setItem('username', username);
        

      }
      navigate("/dashboard")
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');                     //see routing.js for checking which component is attached to /register route
  };

  return (
    <div className="main">
      <Navbar />
      <div className="nav-bottom">
        <div>
          <h3 className='laundry-service1'>Laundry Service</h3>
          <p className='doorstep1'>Doorstep Wash & Dryclean Service</p>
          <p className='dont'>Don't have an account?</p>
          <button className='register' onClick={navigateToRegister}>Register</button>
        </div>

        <div className="right">
          <h4 className='right-sign'>SIGN IN</h4>
          <form onSubmit={handleFormSubmit}>
            <div className="form-input">
              <label>
                Mobile / Email
              </label>
              <br/>
              <input
                type="text"
                name="emailOrMobile"
                value={emailOrMobile}
                onChange={handleInputChange}
                required
                style={{
                  color: isInvalid ? 'red' : 'initial', // Change text color to red if invalid
                }}
              />
              {error && <p className="text-danger">{error}</p>}
            </div>

            <div>
              <label>
                Password
              </label>
              <br/>
              <img style={{position: "relative",left:"465px"}} src={lock} alt='padlock-img'/>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <a href="#" style={{ display: "flex", justifyContent: "right", position:"relative", right:"240px", color: "#5861AE" }}>Forgot Password?</a>
            </div>
            <button type="submit" className='sign-button'>Sign In</button>
          </form>
          <p className="text-center mt-3">{responseMessage}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

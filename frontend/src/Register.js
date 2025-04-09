import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district: '',
    pinCode: '',
    mobile: '',
    password: '',
    state: '',
    address: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value)
  };

  // Function to validate if the input is a valid mobile number (10 digits)
  const validateMobileNumber = (mobile) => {
    return /^[0-9]{10}$/.test(mobile); // Checks if it's exactly 10 digits
  };

  // Function to validate if the input is a valid email address
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email); // Matches a typical email format
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, mobile, password } = formData;

    // Ensure either a valid mobile number or email is provided
    if (!email && !mobile) {
      setError('Please provide either a mobile number or an email.');
      return;
    }

    // Validate the email or mobile
    if (mobile && !validateMobileNumber(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Prepare payload for registration
    const url = 'http://localhost:5000/api/register';
    const payload = {
      email: email || null,  // send null if email is not provided
      mobile: mobile || null, 
      password,
      state: formData.state,
      address: formData.address,
    };
    

    try {
      const response = await axios.post(url, payload);

      if (response.status === 200) {
        setResponseMessage('Registration successful. Please login.');
      }
      setTimeout(() => {
        navigate('/'); // Redirect to home after successful registration
      }, 2000);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const navigateToSignIn = () => {
    navigate('/'); // Redirect to the sign-in page
  };

  return (
    <div className='main'>
      <Navbar />
      <div className='register-mid'>
        <div style={{ width: '402px' }}>
          <h3>Laundry Service</h3>
          <p>Doorstep Wash & Dryclean Service</p>
          <p>Already Have Account</p>
          <button onClick={navigateToSignIn}>
            Sign In
          </button>
        </div>

        

        <div className='right1'>
          <h4>REGISTER</h4>
          <form onSubmit={handleFormSubmit} style={{display:"flex"}}>

          <div className='right2'>
          <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleInputChange}
              />
        <input
                type='text'
                name='mobile'
                placeholder='Phone'
                value={formData.mobile}
                onChange={handleInputChange}
              />
               <input
                type='text'
                name='district'
                placeholder='District'
                value={formData.district}
                onChange={handleInputChange}
              />
        </div>

            <div className='mb-3'>
              <input
                type='text'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
            
              <input
                type='text'
                name='state'
                placeholder='State'
                value={formData.state}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
           
            {error && <p className='text-danger'>{error}</p>}
            <button type='submit' className='btn btn-primary w-100'>
              Register
            </button>
            </div>
          </form>
          <p>{responseMessage}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;

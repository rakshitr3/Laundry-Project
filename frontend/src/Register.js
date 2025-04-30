import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district: '',
    pinCode: '',
    confirmPass: '',
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
      [name]: value,           //handling multiple form fields with one handler //here we make key dynamic
    }));
  };

  const validateMobileNumber = (mobile) => /^[0-9]{10}$/.test(mobile);
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponseMessage('');

    const { name, email, mobile, password, confirmPass } = formData;

    // Required fields validation
    if (!name || !email || !password || !confirmPass) {
      setError('Name, Email, Password and Confirm Password are required.');
      return;
    }

    if (password !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mobile && !validateMobileNumber(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const url = 'http://localhost:5000/api/register';

    const payload = {
      name: formData.name,
      email,
      mobile: mobile || null,
      password,
      district: formData.district,
      pinCode: formData.pinCode,
      state: formData.state,
      address: formData.address,
    };

    try {
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        setResponseMessage('Registration successful. Redirecting...');
      }
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className='main'>
      <Navbar />
      <div className='register-mid'>
        <div style={{ width: '402px' }}>
          <h3 className='laundry-service'>Laundry Service</h3>
          <p className='doorstep'>Doorstep Wash & Dryclean Service</p>
          <p className='already'>Already Have Account</p>
          <button className="sign-register" onClick={() => navigate('/')}>
            Sign In
          </button>
        </div>

        <div className='right1'>
          <h4 className='register1'>REGISTER</h4>
          <form onSubmit={handleFormSubmit} style={{ display: "flex", position: "relative", top: "35px" }}>

            <div className='left'>
              <div>
                <label>Name *</label><br />
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Phone</label><br />
                <input
                  type='text'
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>District</label><br />
                <input
                  type='text'
                  name='district'
                  value={formData.district}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Pincode</label><br />
                <input
                  type='number'
                  name='pinCode'
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Confirm Password *</label><br />
                <input
                  type='password'
                  name='confirmPass'
                  value={formData.confirmPass}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='mb-3'>
              <div>
                <label>Email *</label><br />
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* const [email, setEmail] = useState('');
                  const handleChange = (e) => {
                  setEmail(e.target.value);};   handling with single state*/}

              <div>
                <label>State</label><br />
                <input
                  type='text'
                  name='state'
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Address</label><br />
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Password *</label><br />
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', top: '55px', left:"-330px" }}>
                <input
                  type="checkbox"
                  name="agreement"
                  required
                  style={{ marginTop: '42px' }}
                />
                <span style={{ fontSize: '14px', whiteSpace: 'nowrap',textDecoration:"underline",letterSpacing:"1px" }}>
                  I agree to <a href="#">Terms & Conditions</a> receiving marketing and promotional materials
                </span>
              </label>


              {error && <p className='text-danger'>{error}</p>}
              {responseMessage && <p className='text-success'>{responseMessage}</p>}
              <button type='submit' className='btn1'>Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;

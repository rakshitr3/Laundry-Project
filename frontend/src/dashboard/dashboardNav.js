import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import girlImage from "../img/images.jpg";

const DashboardNav = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); 
  };

  return (
    <nav className='navBar'> 
      <h2 className='top-laundry'>LAUNDRY</h2>
      <ul className="navBar-nav">
        <div className='border'>
          <li className="nav-item"><Link to="/">Pricing</Link></li>
        </div>
     
        <div className='border'>
          <li className="nav-item"><Link to="/pricing" style={{color:"#565657"}}>Career</Link></li>
        </div>

        <div className='border'>
        <button onClick={handleLogout} style={{position: "relative",left: "30px",top: "23px", background: '5861AE',color:"red",fontSize:"17px", border: 'none', cursor: 'pointer'}}>Logout</button>
        </div>

        <div className='border' style={{background: "#5861AE", width:"185px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
          <img src={girlImage} className='img' alt='girl' />
          <span style={{color: 'white',position:"relative",left:"-6px",top:"-4px"}}>
            Hey {username || 'User'} !
          </span>
          
         
        </div>
      </ul>
    </nav>
  );
};

export default DashboardNav;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navBar'> 
      <h2>LAUNDRY</h2>
      <ul className="navBar-nav">
        <div className='border'>
        <li className="nav-item"><Link to="/">Home</Link></li>
        </div>
     
        <div className='border'>
        <li className="nav-item"><Link to="/pricing" style={{color:"#565657"}}>Pricing</Link></li>
        </div>

        <div className='border'>
        <li className="nav-item"><Link to="#">Career</Link></li>
        </div>

        <div className='border' style={{background: "#5861AE",width:"110px"}}>
        <li className="nav-item"><Link to="#" style={{color:"white"}}>Sign In</Link></li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;

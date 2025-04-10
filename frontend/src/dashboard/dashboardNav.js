import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNav = () => {
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

        <div className='border' style={{background: "#5861AE", width:"200px"}}>
          <li className="nav-item"><Link to="#" style={{color:"white",whiteSpace:"nowrap", marginLeft:"40px"}}>User Name</Link></li>
        </div>
      </ul>
    </nav>
  );
}

export default DashboardNav;

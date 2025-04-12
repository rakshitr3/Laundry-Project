import React from 'react';
import { Link } from 'react-router-dom';
import '../VerticalNav.css';
import { MdHome } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import ham from "../img/list.svg";

const VerticalNav = () => {
  return (
    <div className="vertical-navbar">
      <Link to="/">
      <MdHome />
      </Link>
      <Link to="/create" style={{background:"white",color:"blue",width:"150%",height:"8%"}}>
      <div style={{position: "relative",top:"35%",left:"35%",color:"#5861AE"}}>
      <FaPlusCircle />
      </div>
      
      </Link>
      <Link to="/orders">
        <img src={ham} alt="Orders" />
      </Link>
    </div>
  );
};

export default VerticalNav;

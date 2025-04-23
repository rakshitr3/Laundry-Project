import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './VerticalNav.css';
import { MdHome } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const VerticalNav = () => {
  const location = useLocation();         //use location is used here to find which path we are on
  const currentPath = location.pathname;

  return (
    <div className="vertical-navbar">
      <Link
        to="/dashboard"
        className={currentPath === "/dashboard" ? "nav-link active" : "nav-link"}
        style={{ padding: "5px" }}
      >
        <MdHome size={30} style={{ position: "relative", top: "30%", left: "35%", color: currentPath === "/dashboard" ? "#5861AE" : "white" }} />
      </Link>

      <Link
        to="/create"
        className={currentPath === "/create" ? "nav-link active" : "nav-link"}
        style={{ padding: "5px" }}
      >
        <div style={{
          position: "relative", top: "30%", left: "38%",
          color: currentPath === "/create" ? "#5861AE" : "white"
        }}>
          <FaPlusCircle />
        </div>
      </Link>

      <Link
        to="/orders"
        className={currentPath === "/orders" ? "nav-link active" : "nav-link"}
        style={{ padding: "14px" }}
      >
        <div style={{
          position: "relative", top: "15%", left: "33%",
          color: currentPath === "/orders" ? "#5861AE" : "white"
        }}>
          <RxHamburgerMenu size={34} />
        </div>

      </Link>
    </div>
  );
};

export default VerticalNav;







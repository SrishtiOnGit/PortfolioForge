import React from 'react';
import '../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <NavLink to="/">
        <h1 className="title">PortfolioForge</h1>
      </NavLink>

      <ul className="nav-menu">

        <li className="nav-item">
          <NavLink
            to="/About"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            About
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/faq"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            FAQ
          </NavLink>
        </li>
        </ul>
        
        <button className="btn" onClick={() => navigate('/dashboard') }>Get Started</button> 
      
    </header>
  );
};

export default Navbar;
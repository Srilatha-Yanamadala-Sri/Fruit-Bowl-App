import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <h1>Fruit Bowl App</h1>
    <div>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
        Fruit Bowls
      </NavLink>
      <NavLink to="/billing" className={({ isActive }) => (isActive ? 'active' : '')}>
        Billing
      </NavLink>
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
        </NavLink>
    </div>
  </nav>
);

export default Navbar;

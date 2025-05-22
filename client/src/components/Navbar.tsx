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
    </div>
  </nav>
);

export default Navbar;

import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false); // 👈 dropdown toggle state

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  

  // ✅ Logout handler
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    // alert("You have logged out successfully!");
    setDropdownOpen(false); // close dropdown after logout
  };

  return (
    <div className='navbar'>
      {/* Logo */}
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      {/* Menu */}
      <ul className="navbar-menu">
        <li><Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link></li>
        <li><a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
        <li><a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a></li>
        <li><a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a></li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* ✅ Conditional Login/Profile */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            {/* 👇 Click to toggle dropdown */}
            <img
              src={assets.profile_icon}
              alt="Profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='profile-icon'
            />

            {/* 👇 Dropdown visible only when clicked */}
            {dropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="" /><p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

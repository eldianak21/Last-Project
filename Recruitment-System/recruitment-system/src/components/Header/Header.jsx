// Header.jsx
import React from 'react';
import './Header.css'; // Create a Header.css file for styles
import { FaSearch, FaUserCircle } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
    return (
        <header className="navbar">
            <div className="navbar-content">
                <h1 className="logo">Jimma University</h1>
                <nav className="nav-links">
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Features</li>
                        <li>Contact</li>
                    </ul>
                </nav>
                <div className="search-account">
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <FaSearch className="search-icon" />
                    {/* Link to the SignUp page */}
                    <Link to="/sign-up">
                        <FaUserCircle className="account-icon" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
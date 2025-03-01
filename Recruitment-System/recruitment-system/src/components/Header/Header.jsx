import React from 'react';
import './Header.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="navbar">
            <div className="navbar-content">
                <h1 className="logo">Jimma University</h1>
                <nav className="nav-links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/job-posting">Job Posting</Link></li>
                        <li><Link to="/contact-us">Contact</Link></li> {/* Link to the Contact page */}
                    </ul>
                </nav>
                <div className="search-account">
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <FaSearch className="search-icon" />
                    <Link to="/sign-up">
                        <FaUserCircle className="account-icon" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
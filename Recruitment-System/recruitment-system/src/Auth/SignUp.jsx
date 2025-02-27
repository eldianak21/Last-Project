import React from 'react';
import './SignUp.css';

const SignUp = () => {
    return (
        <div className="container">
          <div className="left-section">
            <h1>Welcome to Jimma University Recruitment Hub</h1>
            <p>Log in to access powerful tools for managing candidates, scheduling interviews, and tracking progress—all in one place.</p>
          </div>
          <div className="right-section">
            <div className="job-selection">
              <p>Looking for a job at Jimma University?</p>
              <label>
                <input type="radio" name="job-type" value="corporate-hr" /> Corporate HRs
              </label>
              <label>
                <input type="radio" name="job-type" value="manager" /> Manager
              </label>
            </div>
    
            <form className="login-form">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" name="email" required />
              
              <label htmlFor="phone">Phone number</label>
              <input type="tel" id="phone" name="phone" required />
              
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
              
              <button type="submit">SIGN IN</button>
            </form>
            
            <div className="social-login">
              <p>OR Sign in using</p>
              {/* Add social login buttons here */}
            </div>
            
            <footer>
              <p>© 2024 Jimma University. All Rights Reserved.</p>
            </footer>
          </div>
        </div>
      );
    };

export default SignUp;
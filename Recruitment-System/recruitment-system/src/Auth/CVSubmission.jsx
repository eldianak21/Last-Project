import React from 'react';
import './CVSubmission.css';

const CVSubmission = () => {
    return (
        <div className="form-container">
          {/* Basic Info Section */}
          <h1>Basic Info</h1>
          <div className="form-row">
            <div className="form-column left">
              <div className="form-group">
                <label>Email</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" placeholder="(+231)" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" placeholder="(+231)" />
              </div>
            </div>
            <div className="form-column right">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" />
              </div>
            </div>
          </div>
    
          {/* Address Information Section */}
          <h1>Address Information</h1>
          <div className="form-row">
            <div className="form-column left">
              <div className="form-group">
                <label>City</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Street</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-column right">
              <div className="form-group">
                <label>Country</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Province</label>
                <input type="text" />
              </div>
            </div>
          </div>
    
          {/* Personal Details Section */}
          <h1>Personal Details</h1>
          <div className="form-row">
            <div className="form-column left">
              <div className="form-group">
                <label>Experience in Years</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Highest Qualification</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Held</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-column right">
              <div className="form-group">
                <label>Expected Salary</label>
                <input type="text" />
              </div>
            </div>
          </div>
    
          {/* Second Address Information Section */}
          <h1>Address Information</h1>
          <div className="form-row">
            <div className="form-column left">
              <div className="form-group">
                <label>LinkedIn</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-column right">
              <div className="form-group">
                <label>Twitter</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Skill set</label>
                <input type="text" />
              </div>
            </div>
          </div>
    
          {/* Education and Experience Section */}
          <h1>Educational Details</h1>
          <div className="form-row">
            <div className="form-column left">
              <button className="add-button">+ Add education</button>
            </div>
          </div>
    
          <h1>Experience Details</h1>
          <div className="form-row">
            <div className="form-column left">
              <button className="add-button">+ Add experience</button>
            </div>
          </div>
    
          {/* Documents Section */}
          <h1>Documents</h1>
          <div className="form-row">
            <div className="form-column left">
              <div className="form-group">
                <label>Resume</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>offer</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>cv</label>
                <input type="file" />
              </div>
            </div>
          </div>
        </div>
      );
    };

export default CVSubmission;
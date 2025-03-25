// src/Auth/CVSubmission.jsx
import React from 'react';
import './CVSubmission.css';

function CVSubmission() {
    return (
        <div className="container">
            <h1>Candidate Info</h1>
            <form>
                <div className="form-group">
                    <h2>Basic Info</h2>
                    <label className="label">Email</label>
                    <input type="email" className="input" />
                    <label className="label">Phone</label>
                    <input type="tel" className="input" placeholder="(C) 123-456-7890" />
                    <label className="label">First Name</label>
                    <input type="text" className="input" />
                    <label className="label">Last Name</label>
                    <input type="text" className="input" />
                </div>
                
                <div className="form-group">
                    <h2>Address Information</h2>
                    <label className="label">Street</label>
                    <input type="text" className="input" />
                    <label className="label">City</label>
                    <input type="text" className="input" />
                    <label className="label">Country</label>
                    <input type="text" className="input" />
                </div>

                <div className="form-group">
                    <h2>Personal Details</h2>
                    <label className="label">Skills</label>
                    <input type="text" className="input" />
                    <label className="label">Highest Qualification Held</label>
                    <input type="text" className="input" />
                    <label className="label">Expected Salary</label>
                    <input type="text" className="input" />
                </div>

                <div className="form-group">
                    <h2>Social Media</h2>
                    <label className="label">LinkedIn</label>
                    <input type="url" className="input" />
                    <label className="label">Twitter</label>
                    <input type="url" className="input" />
                </div>

                <div className="form-group">
                    <h2>Educational Details</h2>
                    <button type="button">+ Add Educational Detail</button>
                </div>

                <div className="form-group">
                    <h2>Experience Details</h2>
                    <button type="button">+ Add Experience</button>
                </div>

                <div className="form-group">
                    <label className="label">Other</label>
                    <input type="text" className="input" />
                    <label className="label">CV</label>
                    <input type="file" className="input" />
                </div>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}

export default CVSubmission;
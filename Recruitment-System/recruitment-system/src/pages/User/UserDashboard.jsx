import React, { useState } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    street: '123 Main St',
    city: 'New York',
    province: 'NY',
    country: 'USA',
    skills: ['JavaScript', 'React', 'Node.js'],
    hobbies: ['Hiking', 'Photography', 'Reading'],
    resume: 'resume.pdf',
    coverLetter: 'cover_letter.pdf',
    profilePicture: null,
  });

  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleEdit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser({ ...user, profilePicture: imageURL });
      setShowUploadOptions(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> Profile
          </button>
          <button 
            className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <i className="fas fa-file-alt"></i> Documents
          </button>
          <button 
            className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <i className="fas fa-briefcase"></i> Job Listings
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Settings
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <button className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        {activeTab === 'profile' && (
          <div className="content-section">
            <div className="profile-card">
              <h2>Profile Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone Number</label>
                  <p>{user.phone}</p>
                </div>
                <div className="info-item">
                  <label>Address</label>
                  <p>{user.street}, {user.city}, {user.province}, {user.country}</p>
                </div>
                <div className="info-item">
                  <label>Skills</label>
                  <div className="skills-list">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="info-item">
                  <label>Hobbies</label>
                  <div className="hobbies-list">
                    {user.hobbies.map((hobby, index) => (
                      <span key={index} className="hobby-tag">{hobby}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="avatar-card">
              <h2>Profile Picture</h2>
              <div className="avatar-container">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button 
                className="secondary-btn"
                onClick={() => setShowUploadOptions(!showUploadOptions)}
              >
                Change Photo
              </button>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {showUploadOptions && (
                <div className="upload-options">
                  <button 
                    className="upload-option-btn"
                    onClick={() => document.getElementById('file-input').click()}
                  >
                    <i className="fas fa-upload"></i> Upload Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="content-section">
            <div className="documents-card">
              <h2>My Documents</h2>
              <div className="documents-grid">
                <div className="document-item">
                  <i className="fas fa-file-pdf document-icon"></i>
                  <span>{user.resume}</span>
                  <button className="document-action">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
                <div className="document-item">
                  <i className="fas fa-file-pdf document-icon"></i>
                  <span>{user.coverLetter}</span>
                  <button className="document-action">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
              <div className="upload-area">
                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                <p>Drag & drop files here or click to browse</p>
                <input type="file" className="file-input" multiple />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="content-section">
            <div className="settings-card">
              <h2>Edit Profile</h2>
              <form onSubmit={handleEdit} className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue={user.phone}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Street</label>
                    <input 
                      type="text" 
                      defaultValue={user.street}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input 
                      type="text" 
                      defaultValue={user.city}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Province/State</label>
                    <input 
                      type="text" 
                      defaultValue={user.province}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Country</label>
                    <input 
                      type="text" 
                      defaultValue={user.country}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input 
                      type="text" 
                      defaultValue={user.skills.join(', ')}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Hobbies (comma separated)</label>
                  <input 
                    type="text" 
                    defaultValue={user.hobbies.join(', ')}
                    className="form-input"
                  />
                </div>
                
                <button type="submit" className="primary-btn">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="content-section">
            <h2>Available Job Listings</h2>
            <div className="job-listings">
              <p>Job listings feature coming soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DepartmentHeadDashboard.css';

const DepartmentHeadDashboard = () => {
  const [department] = useState('Software Development'); // This would come from auth context
  const [activeTab, setActiveTab] = useState('candidates');
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Mock data - replace with API calls
  useEffect(() => {
    // Fetch candidates recommended by HR for this department
    const mockCandidates = [
      {
        id: 1,
        name: 'Alice Johnson',
        position: 'Senior Developer',
        status: 'Recommended',
        skills: ['React', 'Node.js', 'TypeScript'],
        experience: '5 years',
        resume: 'alice_johnson.pdf',
        hrNotes: 'Excellent technical skills, strong communication'
      },
      {
        id: 2,
        name: 'Bob Smith',
        position: 'UI/UX Designer',
        status: 'Recommended',
        skills: ['Figma', 'Adobe XD', 'UI Design'],
        experience: '4 years',
        resume: 'bob_smith.pdf',
        hrNotes: 'Creative portfolio, needs technical assessment'
      }
    ];

    // Fetch scheduled interviews
    const mockInterviews = [
      {
        id: 1,
        candidateId: 1,
        candidateName: 'Alice Johnson',
        position: 'Senior Developer',
        date: '2023-06-15',
        time: '10:00 AM',
        duration: '60 mins',
        meetingLink: 'https://meet.example.com/abc123',
        status: 'Scheduled'
      },
      {
        id: 2,
        candidateId: 2,
        candidateName: 'Bob Smith',
        position: 'UI/UX Designer',
        date: '2023-06-16',
        time: '2:00 PM',
        duration: '45 mins',
        meetingLink: 'https://meet.example.com/xyz456',
        status: 'Scheduled'
      }
    ];

    setCandidates(mockCandidates);
    setInterviews(mockInterviews);
  }, []);

  const handleSubmitFeedback = (candidateId) => {
    // Here you would send feedback to HR via API
    alert(`Feedback submitted for candidate ${candidateId}: ${feedback}`);
    setFeedback('');
    setSelectedCandidate(null);
  };

  return (
    <div className="department-container">
      <div className="department-sidebar">
        <div className="sidebar-header">
          <div className="department-avatar">
            <i className="fas fa-user-tie"></i>
          </div>
          <h2>{department} Department</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-link ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            <i className="fas fa-users"></i>
            <span>Recommended Candidates</span>
          </button>
          <button 
            className={`nav-link ${activeTab === 'interviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('interviews')}
          >
            <i className="fas fa-calendar-alt"></i>
            <span>Interview Schedule</span>
          </button>
        </nav>
      </div>

      <div className="department-main">
        <header className="department-header">
          <h1>Department Head Dashboard</h1>
          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">{interviews.length}</span>
            </button>
            <button className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <div className="department-content">
          {activeTab === 'candidates' && (
            <div className="candidates-section">
              <h2>Candidates Recommended by HR</h2>
              <p className="department-description">
                These candidates have been pre-screened by HR for {department} positions.
                Review their profiles and provide feedback after interviews.
              </p>

              <div className="candidates-grid">
                {candidates.map(candidate => (
                  <div key={candidate.id} className="candidate-card">
                    <div className="candidate-header">
                      <h3>{candidate.name}</h3>
                      <span className={`status-badge ${candidate.status.toLowerCase()}`}>
                        {candidate.status}
                      </span>
                    </div>
                    <div className="candidate-details">
                      <p><strong>Position:</strong> {candidate.position}</p>
                      <p><strong>Experience:</strong> {candidate.experience}</p>
                      <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
                      <p><strong>HR Notes:</strong> {candidate.hrNotes}</p>
                    </div>
                    <div className="candidate-actions">
                      <button className="view-resume">
                        <i className="fas fa-file-pdf"></i> View Resume
                      </button>
                      <button 
                        className="provide-feedback"
                        onClick={() => setSelectedCandidate(candidate)}
                      >
                        <i className="fas fa-comment-alt"></i> Provide Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="interviews-section">
              <h2>Scheduled Interviews</h2>
              <p className="department-description">
                Upcoming interviews for {department} positions. Join using the meeting link.
              </p>

              <div className="interviews-table">
                <table>
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Date & Time</th>
                      <th>Meeting Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map(interview => (
                      <tr key={interview.id}>
                        <td>{interview.candidateName}</td>
                        <td>{interview.position}</td>
                        <td>{interview.date} at {interview.time} ({interview.duration})</td>
                        <td>
                          <a 
                            href={interview.meetingLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="meeting-link"
                          >
                            Join Meeting
                          </a>
                        </td>
                        <td>
                          <button 
                            className="feedback-btn"
                            onClick={() => {
                              const candidate = candidates.find(c => c.id === interview.candidateId);
                              setSelectedCandidate(candidate);
                            }}
                          >
                            <i className="fas fa-edit"></i> Feedback
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedCandidate && (
            <div className="feedback-modal">
              <div className="modal-content">
                <h3>Provide Feedback for {selectedCandidate.name}</h3>
                <p><strong>Position:</strong> {selectedCandidate.position}</p>
                
                <div className="feedback-form">
                  <label>
                    Your Feedback:
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter detailed feedback about the candidate..."
                      rows="6"
                    />
                  </label>
                  
                  <div className="rating-section">
                    <label>Technical Skills Rating:</label>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i key={star} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rating-section">
                    <label>Cultural Fit Rating:</label>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i key={star} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      className="submit-btn"
                      onClick={() => handleSubmitFeedback(selectedCandidate.id)}
                    >
                      Submit to HR
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={() => setSelectedCandidate(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeadDashboard;
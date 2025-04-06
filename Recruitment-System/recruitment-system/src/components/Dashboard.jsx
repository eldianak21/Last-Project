// src/components/Dashboard.jsx
import React from 'react';
import AdminPanel from '../pages/Admin/AdminPanel'; // Updated path based on the folder structure
import HRTools from '../pages/HR/HRTools';
import ApplicantFeatures from './ApplicantFeatures';
// import DepartmentHeadDashboard from './DepartmentHeadDashboard';

const Dashboard = () => {
    const userRole = localStorage.getItem('userRole');

    const renderContent = () => {
        switch (userRole) {
            case 'Admin':
                return <AdminPanel />;
            case 'HR Officer':
                return <HRTools />;
            case 'Applicant':
                return <ApplicantFeatures />;
            // case 'Department Head':
            //     return <DepartmentHeadDashboard />;
            default:
                return <p>Unknown role</p>;
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {renderContent()}
        </div>
    );
};

export default Dashboard;
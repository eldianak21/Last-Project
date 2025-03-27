import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import JobPosting from "./components/JobPosting/JobPosting";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import CVSubmission from "./Auth/CVSubmission";
import UserDashboard from "./pages/User/UserDashboard";
import JobDescription from "./components/JobPosting/JobDescription";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import JobPostingsOverview from "./pages/Admin/JobPostingsOverview";
import ApplicationOverview from "./pages/Admin/ApplicationOverview";
import HRManagerDashboard from "./pages/HR/HRManagerDashboard";
import ApplicationManagement from "./pages/HR/ApplicationManagement";
import CandidateProfiles from "./pages/HR/CandidateProfiles";
import JobPostings from "./pages/HR/JobPostings";
import DepartmentHeadManagement from "./pages/HR/DepartmentHeadManagement";
import InterviewResults from "./pages/HR/InterviewResults";
import { AuthProvider } from "./Auth/AuthContext";
import DepartmentHeadDashboard from "./pages/DepartmentHead/DepartmentHeadDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/job-description/:id" element={<JobDescription />} />
          <Route path="/submit-cv" element={<CVSubmission />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/job-posting-overview" element={<JobPostingsOverview />} />
          <Route path="/application-overview" element={<ApplicationOverview />} />
          <Route path="/hr-dashboard" element={<HRManagerDashboard />} />
          <Route path="/job-postings" element={<JobPostings />} />
          <Route path="/department-head" element={<DepartmentHeadDashboard />} />
          <Route
            path="/application-management"
            element={<ApplicationManagement />}
          />
          <Route path="/candidate-profiles" element={<CandidateProfiles />} />
          <Route
            path="/department-head-management"
            element={<DepartmentHeadManagement />}
          />
          <Route path="/result" element={<InterviewResults />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
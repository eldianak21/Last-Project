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
// import DepartmentHeadManagement from "./pages/HR/DepartmentHeadManagement";
import InterviewResults from "./pages/HR/InterviewResults";
import { AuthProvider } from "./Auth/AuthContext";
import DepartmentHeadDashboard from "./pages/DepartmentHead/DepartmentHeadDashboard";
import HrDashboard from "./pages/HR/HrDashboard";
import PrivateRoute from "./Auth/PrivateRoute";
import Dashboard from "./components/Dashboard";
import ChangePassword from "./Auth/ChangePassword";
import InterviewSelection from "./pages/interview/InterviewSelection";
import InterviewerManagement from "./pages/HR/InterviewerManagement";
import InterviewerDashboard from "./pages/InterviewerDashboard/InterviewerDashboard";
import JobDetails from "./pages/HR/JobDetails";
import ApplicationDetailsPage from "./pages/HR/ApplicationDetailsPage";
import PassedApplicantsResult from "./pages/HR/PassedApplicantsResult";
import InterviewScheduling from "./pages/HR/InterviewScheduling";
import VerifyCode from "./Auth/VerifyCode";
// import EvaluationReport from "./pages/Interviewer/InteriewerDashboaard";
// import EvaluationDashboard from "./pages/Interviewer/EvaluationDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/job-description/:id" element={<JobDescription />} />
          <Route path="/submit-cv/:id" element={<CVSubmission />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/interview-selection" element={<InterviewSelection />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route
              path="/job-posting-overview"
              element={<JobPostingsOverview />}
            />
            <Route
              path="/application-overview"
              element={<ApplicationOverview />}
            />
            <Route path="/hr-dashboard" element={<HRManagerDashboard />} />
            <Route path="/job-postings" element={<JobPostings />} />
            <Route path="/job-details/:id" element={<JobDetails />} />
            <Route path="/result" element={<PassedApplicantsResult />} />

            <Route
              path="/result/evaluations/:id"
              element={<InterviewResults />}
            />
            <Route
              path="/department-head"
              element={<DepartmentHeadDashboard />}
            />
            <Route
              path="/application-management"
              element={<ApplicationManagement />}
            />
            <Route
              path="/interview-scheduling"
              element={<InterviewScheduling />}
            />
            <Route
              path="/application-details/:applicationId"
              element={<ApplicationDetailsPage />}
            />
            <Route path="/candidate-profiles" element={<CandidateProfiles />} />
            <Route
              path="/department-head-management"
              element={<InterviewerManagement />}
            />
            <Route
              path="/interviewer-Dashboard"
              element={<InterviewerDashboard />}
            />
            {/* <Route
              path="/evaluation-report/:candidateId"
              component={EvaluationReport}
            /> */}

            <Route path="/dash" element={<HrDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;

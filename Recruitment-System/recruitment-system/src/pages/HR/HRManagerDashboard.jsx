import React from "react";
import { Link } from "react-router-dom";

const HRManagerDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>HR Manager Dashboard</h2>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Link
          to="/job-postings"
          style={{
            display: "block",
            padding: "20px",
            backgroundColor: "#5a7bbd", // Updated color
            color: "white",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a6a9b")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#5a7bbd")
          }
        >
          Job Postings Overview
        </Link>
        <Link
          to="/application-management"
          style={{
            display: "block",
            padding: "20px",
            backgroundColor: "#5a7bbd", // Updated color
            color: "white",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a6a9b")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#5a7bbd")
          }
        >
          Application Management
        </Link>
        <Link
          to="/candidate-profiles"
          style={{
            display: "block",
            padding: "20px",
            backgroundColor: "#5a7bbd", // Updated color
            color: "white",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a6a9b")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#5a7bbd")
          }
        >
          Candidate Profiles
        </Link>
        <Link
          to="/department-head-management"
          style={{
            display: "block",
            padding: "20px",
            backgroundColor: "#5a7bbd", // Updated color
            color: "white",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a6a9b")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#5a7bbd")
          }
        >
          Department Head Management
        </Link>
      </nav>
    </div>
  );
};

export default HRManagerDashboard;

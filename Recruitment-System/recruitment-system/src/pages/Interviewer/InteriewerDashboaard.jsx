import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If you're using React Router
import "./EvaluationReport.css"; // Create this CSS file for styling

const EvaluationReport = () => {
  const { candidateId } = useParams(); // Get candidate ID from URL params (if using React Router)
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          `http://localhost:5000/api/evaluations/${candidateId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvaluations(data);
      } catch (err) {
        console.error("Error fetching evaluations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, [candidateId]);

  if (loading) {
    return <div>Loading evaluation data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!evaluations || evaluations.length === 0) {
    return <div>No evaluations found for this candidate.</div>;
  }

  return (
    <div className="evaluation-report-container">
      <h1>Evaluation Report</h1>
      {evaluations.map((evaluation) => (
        <div key={evaluation.id} className="evaluation-card">
          <h2>Evaluation ID: {evaluation.id}</h2>
          <p>
            <strong>Candidate ID:</strong> {evaluation.candidate_id}
          </p>
          <p>
            <strong>Communication Skills:</strong>{" "}
            {evaluation.communication_skills}
          </p>
          <p>
            <strong>Technical Skills:</strong> {evaluation.technical_skills}
          </p>
          <p>
            <strong>Total Score:</strong> {evaluation.total_score}
          </p>
          <p>
            <strong>Notes:</strong> {evaluation.notes || "No notes provided."}
          </p>
          <p>
            <strong>Evaluated At:</strong>{" "}
            {new Date(evaluation.evaluated_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EvaluationReport;

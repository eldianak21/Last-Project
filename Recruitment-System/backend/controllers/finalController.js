const db = require("../config/db");

// Get evaluations with pass/fail status
const getEvaluationsWithStatus = async (req, res) => {
  const applicationId = req.params.id;

  try {
    // Get evaluations with calculated total_score
    const [evaluations] = await db.query(
      `SELECT *, 
       (communication_skills + technical_skills) AS total_score,
       CASE WHEN (communication_skills + technical_skills) >= 7 THEN 'Pass' ELSE 'Fail' END AS status
       FROM evaluations 
       WHERE application_id = ?`,
      [applicationId]
    );

    if (evaluations.length === 0) {
      return res.status(404).json({ message: "No evaluations found." });
    }

    // Calculate average score
    const totalScore = evaluations.reduce(
      (sum, eval) => sum + eval.total_score,
      0
    );
    const averageScore = totalScore / evaluations.length;
    const overallStatus = averageScore >= 7 ? "Pass" : "Fail";

    res.json({
      evaluations,
      summary: {
        averageScore,
        overallStatus,
        evaluationCount: evaluations.length,
      },
    });
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getEvaluationsWithStatus,
};

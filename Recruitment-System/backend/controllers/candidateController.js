const getCandidateById = async (req, res) => {
  const candidateId = req.params.candidateId;
  const db = req.db;

  try {
    const [results] = await db.execute(
      "SELECT * FROM evaluations WHERE id = ?",
      [candidateId]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.json({
      ...results[0],
      application_date: new Date(results[0].application_date).toISOString(),
    });
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).json({ error: "Failed to retrieve candidate" });
  }
};

module.exports = {
  getCandidateById,
};

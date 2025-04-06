// utils/scheduleInterviews.js
export const scheduleInterviews = (candidates) => {
  return candidates.map(candidate => {
    // Example logic: Schedule interviews based on certain criteria
    return {
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      interviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Schedule 1 week later
    };
  });
};
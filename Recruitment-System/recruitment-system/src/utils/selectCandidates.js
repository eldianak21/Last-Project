// utils/selectCandidates.js
export const selectBestCandidates = (candidates) => {
  return candidates.filter(candidate => {
    // Example logic: candidates must have at least 2 years of experience
    return candidate.experienceYears >= 2;
  });
};
// utils/parseResume.js
const fs = require('fs');
const pdf = require('pdf-parse'); // Use pdf-parse for parsing PDF files

const parseResume = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  // Example parsing logic
  const resumeText = data.text;

  // Implement logic to extract personal info, skills, etc. from resumeText
  const personalInfo = extractPersonalInfo(resumeText);
  const skills = extractSkills(resumeText);

  return {
    personalInfo: {
      experienceYears: personalInfo.experienceYears || 0,
      highestQualification: personalInfo.highestQualification || "",
    },
    skills: skills,
  };
};

// Example functions for extracting personal info and skills
const extractPersonalInfo = (text) => {
  // Implement your logic to extract experience and qualifications
  return {
    experienceYears: 3, // Example value
    highestQualification: "Bachelor's", // Example value
  };
};

const extractSkills = (text) => {
  // Implement your logic to parse skills
  return ["JavaScript", "React"]; // Example skills
};

module.exports = { parseResume };
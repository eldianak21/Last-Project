const fs = require('fs');
const pdf = require('pdf-parse'); // Ensure you have this library installed

const parseResume = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const resumeText = data.text;

    console.log('Raw Resume Text:', resumeText); // Log raw text for debugging

    const personalInfo = extractPersonalInfo(resumeText);
    const skills = extractSkills(resumeText);

    return {
        personalInfo: {
            experienceYears: personalInfo.experienceYears || 0,
            highestQualification: personalInfo.highestQualification || "Not Specified",
        },
        skills,
    };
};

const extractPersonalInfo = (text) => {
    const normalizedText = text.replace(/\s+/g, ' '); // Normalize spaces
    console.log('Normalized Resume Text:', normalizedText); // Log for debugging

    // Extract experience years from projects or education
    const projectExperienceMatch = normalizedText.match(/(Apple Website Clone|Netflix Clone|Amazon Clone|Evangadi Forum)/);
    const educationMatch = normalizedText.match(/(Software Engineering|Full-Stack Web development)/i);
    
    // Basic assumptions for experience calculation
    let experienceYears = 0;
    if (projectExperienceMatch) {
        experienceYears += 1; // Assume 1 year for each relevant project
    }
    if (educationMatch) {
        experienceYears += 1; // Assume 1 year for educational experience
    }

    const qualificationMatch = normalizedText.match(/(Software Engineering|Full-Stack Web development)/i);
    
    return {
        experienceYears,
        highestQualification: qualificationMatch ? qualificationMatch[0] : "Not Specified",
    };
};

const extractSkills = (text) => {
    const skillsList = ["JavaScript", "React", "Node.js", "CSS", "HTML", "Bootstrap", "MySQL", "GitHub"]; // Expand as needed
    return skillsList.filter(skill => text.includes(skill));
};

module.exports = { parseResume };
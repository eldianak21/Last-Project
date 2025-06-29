// const fs = require("fs").promises;
// const pdf = require("pdf-parse");

// // Education ranking weights
// const EDUCATION_RANK = {
//   phd: 25,
//   doctorate: 25,
//   "master's": 20,
//   masters: 20,
//   "bachelor's": 15,
//   bachelors: 15,
//   "associate's": 10,
//   diploma: 5,
//   certification: 3,
// };

// // Function to calculate score based on candidate data and selection criteria
// const calculateScore = (candidate, selectionCriteria) => {
//   let score = 0;

//   // Cap the maximum contribution of experience
//   const experienceScore = Math.min(candidate.experienceYears, 10); // Cap at 10
//   if (experienceScore >= selectionCriteria.minExperienceYears) {
//     score += experienceScore;
//   }

//   // Score based on qualifications
//   if (
//     selectionCriteria.requiredQualifications.includes(
//       candidate.highestQualification.toLowerCase()
//     )
//   ) {
//     score += 20; // Points for matching qualifications
//   }

//   // Score based on skills
//   candidate.skills.forEach((skill) => {
//     if (selectionCriteria.requiredSkills.includes(skill.toLowerCase())) {
//       score += 5; // Points for each required skill matched
//     }
//   });

//   return score;
// };

// // Function to extract keywords from resume text
// const extractKeywords = (text) => {
//   const commonKeywords = [
//     "javascript",
//     "react",
//     "node.js",
//     "python",
//     "sql",
//     "aws",
//     "machine learning",
//     "agile",
//     "devops",
//   ];
//   return commonKeywords.filter((keyword) =>
//     text.toLowerCase().includes(keyword)
//   );
// };

// // Function to extract certifications from resume text
// const extractCertifications = (text) => {
//   const certMatch = text.match(
//     /(?:Certifications?|Licenses?):?\s*([^]*?)(?=Experience|Education|Skills|$)/i
//   );
//   return (
//     certMatch?.[1]
//       ?.split(/[,;\n]/)
//       ?.map((cert) => cert.trim())
//       .filter((cert) => cert) || []
//   );
// };

// // Function to parse the resume and extract relevant information
// const parseResume = async (filePath) => {
//   try {
//     const dataBuffer = await fs.readFile(filePath);
//     const data = await pdf(dataBuffer);
//     const resumeText = data.text.replace(/\s+/g, " ").trim();

//     return {
//       personalInfo: extractPersonalInfo(resumeText),
//       skills: extractSkills(resumeText),
//       experienceYears: extractExperienceDetails(resumeText),
//       highestQualification: extractEducationDetails(resumeText),
//       keywords: extractKeywords(resumeText),
//       certifications: extractCertifications(resumeText),
//     };
//   } catch (error) {
//     console.error("Error parsing resume:", error);
//     return {
//       personalInfo: {},
//       skills: [],
//       experienceYears: 0,
//       highestQualification: "",
//       keywords: [],
//       certifications: [],
//     };
//   }
// };

// // Function to extract personal information from resume text
// const extractPersonalInfo = (text) => {
//   let name = "Not Specified";
//   let email = "Not Specified";
//   let phone = "Not Specified";

//   const emailMatch = text.match(/Email:(\s*)?([\w.-]+@[\w.-]+\.[a-zA-Z]{2,})/i);
//   if (emailMatch && emailMatch[2]) {
//     email = emailMatch[2];
//   }

//   const phoneMatch = text.match(/Phone:(\s*)?(.*?)(?=\n|$)/i);
//   if (phoneMatch && phoneMatch[1]) {
//     phone = phoneMatch[1].trim();
//   }

//   const firstNameMatch = text.match(/FirstName:(\s*)?([A-Z][a-z]+)/i);
//   const lastNameMatch = text.match(/LastName:(\s*)?([A-Z][a-z]+)/i);
//   if (firstNameMatch && lastNameMatch) {
//     name = `${firstNameMatch[2]} ${lastNameMatch[2]}`;
//   }

//   return { name, email, phone };
// };

// // Function to extract skills from resume text
// const extractSkills = (text) => {
//   const skillKeywords = [
//     "Skills",
//     "Technical Skills",
//     "Key Skills",
//     "Competencies",
//   ];
//   let skillsText = "";

//   for (const keyword of skillKeywords) {
//     const match = text.match(
//       new RegExp(
//         `${keyword}:?\\s*([^]*?)(?=Experience|Education|Qualifications|Summary|$)`,
//         "i"
//       )
//     );
//     if (match && match[1]) {
//       skillsText = match[1];
//       break;
//     }
//   }

//   return skillsText
//     .split(/[,;\n]/)
//     .map((skill) => skill.trim())
//     .filter((skill) => skill);
// };

// // Function to extract experience details from resume text
// const extractExperienceDetails = (text) => {
//   const experienceMatch = text.match(/Experience:(\s*)?(\d+)\s*years?/i);
//   return experienceMatch && experienceMatch[2]
//     ? parseInt(experienceMatch[2], 10)
//     : 0;
// };

// // Function to extract education details from resume text
// const extractEducationDetails = (text) => {
//   const qualificationMatch = text.match(
//     /HighestQualification:(\s*)?(Bachelor's?|Master's?|Ph\.?D\.?|Associate's?|Diploma|Certification)\s*(?:of|in)?\s*([\w\s]*?)(?:\sSkills|$)/i
//   );
//   if (qualificationMatch && qualificationMatch[2]) {
//     return qualificationMatch[2].trim();
//   }
//   return "Not Specified";
// };

// module.exports = { parseResume, EDUCATION_RANK };

const fs = require("fs").promises;
const pdf = require("pdf-parse");

// Education ranking weights
const EDUCATION_RANK = {
  phd: 25,
  doctorate: 25,
  "master's": 20,
  masters: 20,
  "bachelor's": 15,
  bachelors: 15,
  "associate's": 10,
  diploma: 5,
  certification: 3,
};

// Function to calculate score based on candidate data and selection criteria
const calculateScore = (candidate, selectionCriteria) => {
  let score = 0;

  // Cap the maximum contribution of experience
  const experienceScore = Math.min(candidate.experienceYears, 10); // Cap at 10
  if (experienceScore >= selectionCriteria.minExperienceYears) {
    score += experienceScore;
  }

  // Score based on qualifications
  if (
    selectionCriteria.requiredQualifications.includes(
      candidate.highestQualification.toLowerCase()
    )
  ) {
    score += 20; // Points for matching qualifications
  }

  // Score based on skills
  candidate.skills.forEach((skill) => {
    if (selectionCriteria.requiredSkills.includes(skill.toLowerCase())) {
      score += 5; // Points for each required skill matched
    }
  });

  return score;
};

// Function to extract keywords from resume text
const extractKeywords = (text) => {
  const commonKeywords = [
    "javascript",
    "react",
    "node.js",
    "python",
    "sql",
    "aws",
    "machine learning",
    "agile",
    "devops",
  ];
  return commonKeywords.filter((keyword) =>
    text.toLowerCase().includes(keyword)
  );
};

// Function to extract certifications from resume text
const extractCertifications = (text) => {
  const certMatch = text.match(
    /(?:Certifications?|Licenses?):?\s*([^]*?)(?=Experience|Education|Skills|$)/i
  );
  return (
    certMatch?.[1]
      ?.split(/[,;\n]/)
      ?.map((cert) => cert.trim())
      .filter((cert) => cert) || []
  );
};

// Function to parse the resume and extract relevant information
const parseResume = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    const resumeText = data.text.replace(/\s+/g, " ").trim();

    return {
      personalInfo: extractPersonalInfo(resumeText),
      skills: extractSkills(resumeText),
      experienceYears: extractExperienceDetails(resumeText),
      highestQualification: extractEducationDetails(resumeText),
      keywords: extractKeywords(resumeText),
      certifications: extractCertifications(resumeText),
    };
  } catch (error) {
    console.error("Error parsing resume:", error);
    return {
      personalInfo: {},
      skills: [],
      experienceYears: 0,
      highestQualification: "",
      keywords: [],
      certifications: [],
    };
  }
};

// Function to extract personal information from resume text
const extractPersonalInfo = (text) => {
  console.log("Extracting Personal Info...");

  const emailMatch = text.match(/Email:\s*([\w.-]+@[\w.-]+\.[a-zA-Z]+)/i);
  // In extractPersonalInfo function
  const phoneMatch =
    text.match(/(?:Phone|Tel|Mobile)[:\s]*([+\d\s()-]+)/i) ||
    text.match(/(?:Phone|Tel|Mobile)([+\d\s()-]+)/i);
  // In extractPersonalInfo function
  const firstNameMatch = text.match(
    /(?:First\s*Name|Name\s*First)[:\s]*([A-Za-z]+)/i
  );
  const lastNameMatch = text.match(
    /(?:Last\s*Name|Name\s*Last|Surname)[:\s]*([A-Za-z]+)/i
  );

  console.log("Raw Resume Text:", text);
  console.log("Email Match:", emailMatch);
  console.log("Phone Match:", phoneMatch);
  console.log("First Name Match:", firstNameMatch);
  console.log("Last Name Match:", lastNameMatch);

  return {
    name:
      firstNameMatch && lastNameMatch
        ? `${firstNameMatch[1].trim()} ${lastNameMatch[1].trim()}`
        : "Not Specified",
    email: emailMatch ? emailMatch[1].trim() : "Not Specified",
    phone: phoneMatch ? phoneMatch[1].trim() : "Not Specified",
  };
};

const extractEducationDetails = (text) => {
  const qualificationMatch = text.match(
    /HighestQualification:\s*(Bachelor's in [\w\s]+|Master's in [\w\s]+|Ph\.?D\.?|Doctorate|Associate's?|Diploma|Certification|Bachelor's|Master's)/i
  );

  console.log("Qualification Match:", qualificationMatch);

  return qualificationMatch
    ? qualificationMatch[0].split(":")[1].trim()
    : "Not Specified"; // Extract the full qualification
};

// Function to extract experience details from resume text
const extractExperienceDetails = (text) => {
  const experienceMatch = text.match(/Experience:\s*(\d+)\s*years?/i);
  console.log("Experience Match:", experienceMatch);
  return experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
};

// Function to extract skills from resume text
const extractSkills = (text) => {
  const skillKeywords = [
    "Skills",
    "Technical Skills",
    "Key Skills",
    "Competencies",
  ];
  let skillsText = "";

  for (const keyword of skillKeywords) {
    const match = text.match(
      new RegExp(
        `${keyword}:?\\s*([^]*?)(?=Experience|Education|Qualifications|Summary|$)`,
        "i"
      )
    );
    if (match && match[1]) {
      skillsText = match[1];
      break;
    }
  }

  return skillsText
    .split(/[,;\n]/)
    .map((skill) => skill.trim())
    .filter((skill) => skill);
};

module.exports = { parseResume, EDUCATION_RANK };

import React, { useState } from 'react';
import './CVSubmission.css';

const CVSubmission = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone1: '',
    phone2: '',
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    country: '',
    province: '',
    experienceYears: '',
    highestQualification: '',
    held: '',
    expectedSalary: '',
    linkedIn: '',
    twitter: '',
    skillSet: '',
    resume: null,
    offer: null,
    cv: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'email', 'phone1', 'firstName', 'lastName', 
      'city', 'country', 'experienceYears', 'highestQualification'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Form submitted successfully!');
      }, 1000);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Basic Info Section */}
        <h1>Basic Info</h1>
        <div className="form-row">
          <div className="form-column left">
            <div className="form-group">
              <label>Email*</label>
              <input 
                type="text" 
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone*</label>
              <input 
                type="text" 
                name="phone1"
                placeholder="(+231)" 
                value={formData.phone1}
                onChange={handleChange}
              />
              {errors.phone1 && <span className="error">{errors.phone1}</span>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="text" 
                name="phone2"
                placeholder="(+231)" 
                value={formData.phone2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-column right">
            <div className="form-group">
              <label>First Name*</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <h1>Address Information</h1>
        <div className="form-row">
          <div className="form-column left">
            <div className="form-group">
              <label>City*</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>Street</label>
              <input 
                type="text" 
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-column right">
            <div className="form-group">
              <label>Country*</label>
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label>Province</label>
              <input 
                type="text" 
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <h1>Personal Details</h1>
        <div className="form-row">
          <div className="form-column left">
            <div className="form-group">
              <label>Experience in Years*</label>
              <input 
                type="text" 
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
              />
              {errors.experienceYears && <span className="error">{errors.experienceYears}</span>}
            </div>
            <div className="form-group">
              <label>Highest Qualification*</label>
              <input 
                type="text" 
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
              />
              {errors.highestQualification && <span className="error">{errors.highestQualification}</span>}
            </div>
            <div className="form-group">
              <label>Held</label>
              <input 
                type="text" 
                name="held"
                value={formData.held}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-column right">
            <div className="form-group">
              <label>Expected Salary</label>
              <input 
                type="text" 
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Second Address Information Section */}
        <h1>Address Information</h1>
        <div className="form-row">
          <div className="form-column left">
            <div className="form-group">
              <label>LinkedIn</label>
              <input 
                type="text" 
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-column right">
            <div className="form-group">
              <label>Twitter</label>
              <input 
                type="text" 
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Skill set</label>
              <input 
                type="text" 
                name="skillSet"
                value={formData.skillSet}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Education and Experience Section */}
        <h1>Educational Details</h1>
        <div className="form-row">
          <div className="form-column left">
            <button type="button" className="add-button">+ Add education</button>
          </div>
        </div>

        <h1>Experience Details</h1>
        <div className="form-row">
          <div className="form-column left">
            <button type="button" className="add-button">+ Add experience</button>
          </div>
        </div>

        {/* Documents Section */}
        <h1>Documents</h1>
        <div className="form-row">
          <div className="form-column left">
            <div className="form-group">
              <label>Resume</label>
              <input 
                type="file" 
                name="resume"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>offer</label>
              <input 
                type="file" 
                name="offer"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>cv</label>
              <input 
                type="file" 
                name="cv"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-submit">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CVSubmission;
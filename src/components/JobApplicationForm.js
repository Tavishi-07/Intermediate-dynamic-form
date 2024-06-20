import React from 'react';
import useForm from '../hooks/useForm';
import Modal from './Modal';
import './JobApplicationForm.css';

const validate = (values) => {
  let errors = {};

  if (!values.fullName) {
    errors.fullName = "Full Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(values.fullName)) {
    errors.fullName = "Full Name must contain only letters and spaces";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Phone Number must be a valid 10-digit number";
  }

  if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
    errors.relevantExperience = "Relevant Experience is required";
  } else if (values.relevantExperience <= 0) {
    errors.relevantExperience = "Relevant Experience must be greater than 0";
  }

  if (values.position === 'Designer' && !values.portfolioUrl) {
    errors.portfolioUrl = "Portfolio URL is required";
  } else if (values.portfolioUrl && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioUrl)) {
    errors.portfolioUrl = "Portfolio URL is invalid";
  }

  if (values.position === 'Manager' && !values.managementExperience) {
    errors.managementExperience = "Management Experience is required";
  }

  if (!Object.values(values.additionalSkills).some(skill => skill)) {
    errors.additionalSkills = "At least one skill must be selected";
  }

  if (!values.preferredInterviewTime) {
    errors.preferredInterviewTime = "Preferred Interview Time is required";
  }

  return errors;
};

const JobApplicationForm = () => {
  const { values, errors, formSubmitted, handleChange, handleSubmit, resetForm } = useForm(
    {
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: {
        JavaScript: false,
        CSS: false,
        Python: false,
        React: false,
        NodeJS: false,
        TypeScript: false,
      },
      preferredInterviewTime: '',
    },
    validate
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div className="form-field">
          <label>Applying for Position</label>
          <select
            name="position"
            value={values.position}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p className="error">{errors.position}</p>}
        </div>
        {(values.position === 'Developer' || values.position === 'Designer') && (
          <div className="form-field">
            <label>Relevant Experience (Years)</label>
            <input
              type="number"
              name="relevantExperience"
              value={values.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
          </div>
        )}
        {values.position === 'Designer' && (
          <div className="form-field">
            <label>Portfolio URL</label>
            <input
              type="text"
              name="portfolioUrl"
              value={values.portfolioUrl}
              onChange={handleChange}
            />
            {errors.portfolioUrl && <p className="error">{errors.portfolioUrl}</p>}
          </div>
        )}
        {values.position === 'Manager' && (
          <div className="form-field">
            <label>Management Experience</label>
            <textarea
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
          </div>
        )}
        <div className="form-field">
          <label>Additional Skills</label>
          <div className="checkbox-group">
            <div className="checkbox-column">
              {['JavaScript', 'CSS', 'Python'].map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    name={`additionalSkills.${skill}`}
                    checked={values.additionalSkills[skill]}
                    onChange={(e) => {
                      const { name, checked } = e.target;
                      const [field, skill] = name.split('.');
                      handleChange({
                        target: {
                          name: field,
                          value: { ...values[field], [skill]: checked }
                        }
                      });
                    }}
                  />
                  {skill}
                </label>
              ))}
            </div>
            <div className="checkbox-column">
              {['React', 'NodeJS', 'TypeScript'].map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    name={`additionalSkills.${skill}`}
                    checked={values.additionalSkills[skill]}
                    onChange={(e) => {
                      const { name, checked } = e.target;
                      const [field, skill] = name.split('.');
                      handleChange({
                        target: {
                          name: field,
                          value: { ...values[field], [skill]: checked }
                        }
                      });
                    }}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
          {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
        </div>
        <div className="form-field">
          <label>Preferred Interview Time</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime}
            onChange={handleChange}
          />
          {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Modal show={formSubmitted} onClose={resetForm}>
        <h2>Form Summary</h2>
        <p><strong>Full Name:</strong> {values.fullName}</p>
        <p><strong>Email:</strong> {values.email}</p>
        <p><strong>Phone Number:</strong> {values.phoneNumber}</p>
        <p><strong>Applying for Position:</strong> {values.position}</p>
        {(values.position === 'Developer' || values.position === 'Designer') && (
          <p><strong>Relevant Experience:</strong> {values.relevantExperience}</p>
        )}
        {values.position === 'Designer' && (
          <p><strong>Portfolio URL:</strong> {values.portfolioUrl}</p>
        )}
        {values.position === 'Manager' && (
          <p><strong>Management Experience:</strong> {values.managementExperience}</p>
        )}
        <p><strong>Additional Skills:</strong> {Object.keys(values.additionalSkills).filter(skill => values.additionalSkills[skill]).join(', ')}</p>
        <p><strong>Preferred Interview Time:</strong> {values.preferredInterviewTime}</p>
      </Modal>
    </div>
  );
};

export default JobApplicationForm;

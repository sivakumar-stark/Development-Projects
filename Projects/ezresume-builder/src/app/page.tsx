'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ResumeData, initialResumeData, PersonalInfo, WorkExperience, Education, Skill, Language, Certification, AwardActivity } from '@/lib/types';
import { downloadResumeAsHTML, printResume } from '@/lib/pdf-utils';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import SummaryForm from '@/components/SummaryForm';
import WorkExperienceForm from '@/components/WorkExperienceForm';
import EducationForm from '@/components/EducationForm';
import SkillsForm from '@/components/SkillsForm';
import LanguagesForm from '@/components/LanguagesForm';
import CertificationsForm from '@/components/CertificationsForm';
import AwardsActivitiesForm from '@/components/AwardsActivitiesForm';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  // --- Personal Info Handler ---
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prevData => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        [field]: value,
      },
    }));
  };

  // --- Summary Handler ---
  const handleSummaryChange = (value: string) => {
    setResumeData(prevData => ({
      ...prevData,
      summary: value,
    }));
  };

  // --- Work Experience Handlers ---
  const handleAddWorkExperience = () => {
    setResumeData(prevData => ({
      ...prevData,
      workExperience: [
        ...prevData.workExperience,
        {
          id: uuidv4(),
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [''],
        },
      ],
    }));
  };

  const handleRemoveWorkExperience = (index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof Omit<WorkExperience, 'id' | 'responsibilities'>,
    value: string
  ) => {
    setResumeData(prevData => {
      const updatedExperience = [...prevData.workExperience];
      updatedExperience[index] = { ...updatedExperience[index], [field]: value };
      return { ...prevData, workExperience: updatedExperience };
    });
  };

  const handleResponsibilityChange = (expIndex: number, respIndex: number, value: string) => {
    setResumeData(prevData => {
      const updatedExperience = [...prevData.workExperience];
      const updatedResponsibilities = [...updatedExperience[expIndex].responsibilities];
      updatedResponsibilities[respIndex] = value;
      updatedExperience[expIndex] = { ...updatedExperience[expIndex], responsibilities: updatedResponsibilities };
      return { ...prevData, workExperience: updatedExperience };
    });
  };

   const handleAddResponsibility = (expIndex: number) => {
    setResumeData(prevData => {
      const updatedExperience = [...prevData.workExperience];
      const updatedResponsibilities = [...updatedExperience[expIndex].responsibilities, ''];
      updatedExperience[expIndex] = { ...updatedExperience[expIndex], responsibilities: updatedResponsibilities };
      return { ...prevData, workExperience: updatedExperience };
    });
  };

  const handleRemoveResponsibility = (expIndex: number, respIndex: number) => {
     setResumeData(prevData => {
      const updatedExperience = [...prevData.workExperience];
      const updatedResponsibilities = updatedExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex);
       if (updatedResponsibilities.length === 0) {
           updatedResponsibilities.push('');
       }
      updatedExperience[expIndex] = { ...updatedExperience[expIndex], responsibilities: updatedResponsibilities };
      return { ...prevData, workExperience: updatedExperience };
    });
  };

  // --- Education Handlers ---
  const handleAddEducation = () => {
    setResumeData(prevData => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          id: uuidv4(),
          degree: '',
          school: '',
          location: '',
          graduationDate: '',
        },
      ],
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Omit<Education, 'id'>,
    value: string
  ) => {
    setResumeData(prevData => {
      const updatedEducation = [...prevData.education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      return { ...prevData, education: updatedEducation };
    });
  };

  // --- Skills Handlers ---
  const handleAddSkill = () => {
    setResumeData(prevData => ({
      ...prevData,
      skills: [
        ...prevData.skills,
        { id: uuidv4(), name: '' },
      ],
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    setResumeData(prevData => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[index] = { ...updatedSkills[index], name: value };
      return { ...prevData, skills: updatedSkills };
    });
  };

  // --- Languages Handlers ---
  const handleAddLanguage = () => {
    setResumeData(prevData => ({
      ...prevData,
      languages: [
        ...prevData.languages,
        { id: uuidv4(), name: '', level: '' },
      ],
    }));
  };

  const handleRemoveLanguage = (index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      languages: prevData.languages.filter((_, i) => i !== index),
    }));
  };

  const handleLanguageChange = (
    index: number,
    field: keyof Omit<Language, 'id'>,
    value: string
  ) => {
    setResumeData(prevData => {
      const updatedLanguages = [...prevData.languages];
      updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
      return { ...prevData, languages: updatedLanguages };
    });
  };

  // --- Certifications Handlers ---
  const handleAddCertification = () => {
    setResumeData(prevData => ({
      ...prevData,
      certifications: [
        ...prevData.certifications,
        { id: uuidv4(), name: '', issuingOrganization: '', date: '' },
      ],
    }));
  };

  const handleRemoveCertification = (index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      certifications: prevData.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationChange = (
    index: number,
    field: keyof Omit<Certification, 'id'>,
    value: string
  ) => {
    setResumeData(prevData => {
      const updatedCertifications = [...prevData.certifications];
      updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
      return { ...prevData, certifications: updatedCertifications };
    });
  };

  // --- Awards/Activities Handlers ---
  const handleAddAwardActivity = () => {
    setResumeData(prevData => ({
      ...prevData,
      awardsActivities: [
        ...prevData.awardsActivities,
        { id: uuidv4(), name: '', dateOrDescription: '' },
      ],
    }));
  };

  const handleRemoveAwardActivity = (index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      awardsActivities: prevData.awardsActivities.filter((_, i) => i !== index),
    }));
  };

  const handleAwardActivityChange = (
    index: number,
    field: keyof Omit<AwardActivity, 'id'>,
    value: string
  ) => {
    setResumeData(prevData => {
      const updatedAwardsActivities = [...prevData.awardsActivities];
      updatedAwardsActivities[index] = { ...updatedAwardsActivities[index], [field]: value };
      return { ...prevData, awardsActivities: updatedAwardsActivities };
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">EZ Resume Builder</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto py-6 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Resume Form/Editor Section */}
          <section className="md:w-1/2 bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Resume Editor</h2>
              <div className="text-sm text-gray-500 italic">Fill in your details below</div>
            </div>

            {/* Personal Info Form */}
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={handlePersonalInfoChange}
            />
            <hr className="my-6 border-gray-200" />

            {/* Summary Form */}
            <SummaryForm
              summary={resumeData.summary}
              onChange={handleSummaryChange}
            />
            <hr className="my-6 border-gray-200" />

            {/* Work Experience Form */}
            <WorkExperienceForm
              data={resumeData.workExperience}
              onChange={handleWorkExperienceChange}
              onAdd={handleAddWorkExperience}
              onRemove={handleRemoveWorkExperience}
              onResponsibilityChange={handleResponsibilityChange}
              onAddResponsibility={handleAddResponsibility}
              onRemoveResponsibility={handleRemoveResponsibility}
            />
            <hr className="my-6 border-gray-200" />

            {/* Education Form */}
            <EducationForm 
              data={resumeData.education}
              onChange={handleEducationChange}
              onAdd={handleAddEducation}
              onRemove={handleRemoveEducation}
            />
            <hr className="my-6 border-gray-200" />

            {/* Skills Form */}
            <SkillsForm
              data={resumeData.skills}
              onChange={handleSkillChange}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
            <hr className="my-6 border-gray-200" />

            {/* Languages Form */}
            <LanguagesForm
              data={resumeData.languages}
              onChange={handleLanguageChange}
              onAdd={handleAddLanguage}
              onRemove={handleRemoveLanguage}
            />
            <hr className="my-6 border-gray-200" />

            {/* Certifications Form */}
            <CertificationsForm
              data={resumeData.certifications}
              onChange={handleCertificationChange}
              onAdd={handleAddCertification}
              onRemove={handleRemoveCertification}
            />
            <hr className="my-6 border-gray-200" />

            {/* Awards & Activities Form */}
            <AwardsActivitiesForm
              data={resumeData.awardsActivities}
              onChange={handleAwardActivityChange}
              onAdd={handleAddAwardActivity}
              onRemove={handleRemoveAwardActivity}
            />

          </section>

          {/* Resume Preview Section */}
          <section className="md:w-1/2 bg-white p-6 rounded-lg shadow-md relative">
            <div className="sticky top-6 left-0 right-0">
              {/* Preview Header with Actions */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => printResume(resumeData)}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded flex items-center text-sm transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    Print
                  </button>
                  
                  <button
                    onClick={() => downloadResumeAsHTML(resumeData)}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center text-sm transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download HTML
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="border rounded-lg p-6 bg-white shadow-inner overflow-auto max-h-[calc(100vh-200px)]">
                {/* Display Personal Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-center mb-2">{resumeData.personalInfo.name || "Your Name"}</h3>
                  <p className="text-center text-sm">
                    {resumeData.personalInfo.address || "Address"} | {resumeData.personalInfo.phone || "Phone"} | {resumeData.personalInfo.email || "Email"}
                  </p>
                  <div className="text-center text-sm">
                    {resumeData.personalInfo.linkedin && (
                      <span>LinkedIn: <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resumeData.personalInfo.linkedin}</a></span>
                    )}
                    {resumeData.personalInfo.linkedin && resumeData.personalInfo.website && <span> | </span>}
                    {resumeData.personalInfo.website && (
                      <span>Website: <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resumeData.personalInfo.website}</a></span>
                    )}
                  </div>
                </div>

                {/* Display Summary */}
                {resumeData.summary && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h4>
                    <p className="text-sm whitespace-pre-wrap">{resumeData.summary}</p>
                  </div>
                )}

                {/* Display Work Experience */}
                {resumeData.workExperience.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Work Experience</h4>
                    {resumeData.workExperience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <h5 className="font-semibold">{exp.jobTitle || "Job Title"}</h5>
                        <p className="text-sm italic">{exp.company || "Company"} - {exp.location || "Location"}</p>
                        <p className="text-xs text-gray-600">{exp.startDate || "Start Date"} - {exp.endDate || "End Date"}</p>
                        <div className="text-sm mt-1 space-y-1">
                          {exp.responsibilities.map((resp, index) => (
                            resp && <p key={index} className="whitespace-pre-wrap">{resp}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Display Education */}
                {resumeData.education.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Education</h4>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="mb-3"> 
                        <h5 className="font-semibold">{edu.degree || "Degree/Qualification"}</h5>
                        <p className="text-sm italic">{edu.school || "School/University"} - {edu.location || "Location"}</p>
                        <p className="text-xs text-gray-600">Graduated: {edu.graduationDate || "Graduation Date"}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Display Skills */}
                {resumeData.skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {resumeData.skills.map((skill) => (
                        skill.name && <li key={skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Display Languages */}
                {resumeData.languages.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Languages</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {resumeData.languages.map((lang) => (
                        lang.name && (
                          <li key={lang.id}>
                            {lang.name}
                            {lang.level && ` (${lang.level})`}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}

                {/* Display Certifications */}
                {resumeData.certifications.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Certifications</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {resumeData.certifications.map((cert) => (
                        cert.name && (
                          <li key={cert.id}>
                            {cert.name}
                            {cert.issuingOrganization && ` - ${cert.issuingOrganization}`}
                            {cert.date && ` (${cert.date})`}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}

                {/* Display Awards & Activities */}
                {resumeData.awardsActivities.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold border-b pb-1 mb-2">Awards & Activities</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {resumeData.awardsActivities.map((item) => (
                        item.name && (
                          <li key={item.id}>
                            {item.name}
                            {item.dateOrDescription && ` - ${item.dateOrDescription}`}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}

                {/* Empty State */}
                {!resumeData.personalInfo.name && !resumeData.summary && resumeData.workExperience.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium">Start filling out the form to build your resume</p>
                    <p className="mt-2 text-sm">Your resume preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-10">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EZ Resume Builder. All rights reserved.</p>
          <p className="mt-1 text-gray-400 text-xs">Create professional resumes in minutes</p>
        </div>
      </footer>
    </div>
  );
}
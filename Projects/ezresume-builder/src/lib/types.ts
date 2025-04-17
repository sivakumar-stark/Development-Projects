export interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin?: string; // Optional
  website?: string;  // Optional
}

export interface WorkExperience {
  id: string; // Unique ID for list rendering
  jobTitle: string;
  company: string;
  location: string;
  startDate: string; // Consider using Date objects later if needed
  endDate: string;   // Could be 'Present' or a date
  responsibilities: string[]; // Array of bullet points
}

export interface Education {
  id: string; // Unique ID for list rendering
  degree: string;
  school: string;
  location: string;
  graduationDate: string; // Consider using Date objects later
}

export interface Skill {
  id: string; // Unique ID for list rendering
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; // Optional skill level
}

export interface Language {
  id: string;
  name: string;
  level?: string; // Optional e.g., Native, Fluent, Conversational
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization?: string; // Optional
  date?: string; // Optional
}

export interface AwardActivity {
  id: string;
  name: string;
  dateOrDescription?: string; // Optional e.g., (2024) or "Led onboarding project"
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string; // Added summary
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[]; // Added languages
  certifications: Certification[]; // Added certifications
  awardsActivities: AwardActivity[]; // Added awards/activities
}

// Default empty state for initialization
export const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    address: '',
    phone: '',
    email: '',
    linkedin: '',
    website: '',
  },
  summary: '', // Added
  workExperience: [],
  education: [],
  skills: [],
  languages: [], // Added
  certifications: [], // Added
  awardsActivities: [], // Added
};

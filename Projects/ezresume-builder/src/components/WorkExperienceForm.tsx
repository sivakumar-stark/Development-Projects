import React from 'react';
import { WorkExperience } from '@/lib/types';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (index: number, field: keyof Omit<WorkExperience, 'id' | 'responsibilities'>, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onResponsibilityChange: (expIndex: number, respIndex: number, value: string) => void;
  onAddResponsibility: (expIndex: number) => void;
  onRemoveResponsibility: (expIndex: number, respIndex: number) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  data,
  onChange,
  onAdd,
  onRemove,
  onResponsibilityChange,
  onAddResponsibility,
  onRemoveResponsibility,
}) => {
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Extract the field name (e.g., 'jobTitle', 'company', etc.)
    const fieldName = name.split('-')[0] as keyof Omit<WorkExperience, 'id' | 'responsibilities'>;
    onChange(index, fieldName, value);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-md font-medium mb-2">Work Experience</h3>
      {data.map((exp, expIndex) => (
        <div key={exp.id} className="p-4 border rounded space-y-4 bg-gray-50">
          {/* Experience Header */}
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Experience {expIndex + 1}</h4>
            <button
              type="button"
              onClick={() => onRemove(expIndex)}
              className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
            >
              Remove
            </button>
          </div>

          {/* Job Title */}
          <div>
            <label htmlFor={`jobTitle-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name={`jobTitle-${exp.id}`}
              id={`jobTitle-${exp.id}`}
              value={exp.jobTitle}
              onChange={(e) => handleInputChange(expIndex, e)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              name={`company-${exp.id}`}
              id={`company-${exp.id}`}
              value={exp.company}
              onChange={(e) => handleInputChange(expIndex, e)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor={`location-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name={`location-${exp.id}`}
              id={`location-${exp.id}`}
              value={exp.location}
              onChange={(e) => handleInputChange(expIndex, e)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Dates - Side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                name={`startDate-${exp.id}`}
                id={`startDate-${exp.id}`}
                value={exp.startDate}
                onChange={(e) => handleInputChange(expIndex, e)}
                placeholder="e.g. Jan 2020"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                name={`endDate-${exp.id}`}
                id={`endDate-${exp.id}`}
                value={exp.endDate}
                onChange={(e) => handleInputChange(expIndex, e)}
                placeholder="e.g. Present"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
              <button
                type="button"
                onClick={() => onAddResponsibility(expIndex)}
                className="text-indigo-600 hover:text-indigo-800 text-xs"
              >
                + Add Responsibility
              </button>
            </div>
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex items-start mb-2">
                <textarea
                  value={resp}
                  onChange={(e) => onResponsibilityChange(expIndex, respIndex, e.target.value)}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe your responsibility or achievement"
                />
                <button
                  type="button"
                  onClick={() => onRemoveResponsibility(expIndex, respIndex)}
                  className="ml-2 text-red-500 hover:text-red-700 text-xs"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Experience Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;

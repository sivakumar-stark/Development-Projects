import React from 'react';
import { Education } from '@/lib/types';

interface EducationFormProps {
  data: Education[];
  onChange: (index: number, field: keyof Omit<Education, 'id'>, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'degree' || name === 'school' || name === 'location' || name === 'graduationDate') {
      onChange(index, name as keyof Omit<Education, 'id'>, value);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-md font-medium mb-2">Education</h3>
      {data.map((edu, index) => (
        <div key={edu.id} className="p-4 border rounded space-y-3 relative bg-gray-50">
          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-white border border-red-300 rounded"
          >
            Remove Education
          </button>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div>
              <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-700">Degree / Qualification</label>
              <input
                type="text"
                name="degree"
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => handleInputChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor={`school-${edu.id}`} className="block text-sm font-medium text-gray-700">School / University</label>
              <input
                type="text"
                name="school"
                id={`school-${edu.id}`}
                value={edu.school}
                onChange={(e) => handleInputChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor={`location-${edu.id}`} className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                id={`location-${edu.id}`}
                value={edu.location}
                onChange={(e) => handleInputChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor={`graduationDate-${edu.id}`} className="block text-sm font-medium text-gray-700">Graduation Date</label>
              <input
                type="text" // Consider type="month" or date picker
                name="graduationDate"
                id={`graduationDate-${edu.id}`}
                value={edu.graduationDate}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="e.g., May 2019"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;

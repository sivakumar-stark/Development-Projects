import React from 'react';
import { Skill } from '@/lib/types';

interface SkillsFormProps {
  data: Skill[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.target.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium mb-2">Skills</h3>
      {data.map((skill, index) => (
        <div key={skill.id} className="flex items-center space-x-2">
          <input
            type="text"
            name={`skill-${skill.id}`}
            id={`skill-${skill.id}`}
            value={skill.name}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="e.g., JavaScript, Project Management"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Skill Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Skill
      </button>
    </div>
  );
};

export default SkillsForm;

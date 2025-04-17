import React from 'react';
import { Language } from '@/lib/types';

interface LanguagesFormProps {
  data: Language[];
  onChange: (index: number, field: keyof Omit<Language, 'id'>, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Extract the field name (e.g., 'name' or 'level')
    const fieldName = name.split('-')[0] as keyof Omit<Language, 'id'>;
    if (fieldName === 'name' || fieldName === 'level') {
        onChange(index, fieldName, value);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium mb-2">Languages</h3>
      {data.map((lang, index) => (
        <div key={lang.id} className="flex items-center space-x-2">
          <input
            type="text"
            name={`name-${lang.id}`} // Unique name for the language name input
            id={`name-${lang.id}`}
            value={lang.name}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="e.g., English"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
           <input
            type="text"
            name={`level-${lang.id}`} // Unique name for the level input
            id={`level-${lang.id}`}
            value={lang.level || ''}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Level (Optional, e.g., Native, Fluent)"
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Adjust width as needed
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

      {/* Add Language Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Language
      </button>
    </div>
  );
};

export default LanguagesForm;

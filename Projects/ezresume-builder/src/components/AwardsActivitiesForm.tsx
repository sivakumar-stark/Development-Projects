import React from 'react';
import { AwardActivity } from '@/lib/types';

interface AwardsActivitiesFormProps {
  data: AwardActivity[];
  onChange: (index: number, field: keyof Omit<AwardActivity, 'id'>, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const AwardsActivitiesForm: React.FC<AwardsActivitiesFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Extract the field name (e.g., 'name' or 'dateOrDescription')
    const fieldName = name.split('-')[0] as keyof Omit<AwardActivity, 'id'>;
    if (fieldName === 'name' || fieldName === 'dateOrDescription') {
      onChange(index, fieldName, value);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium mb-2">Awards & Activities</h3>
      {data.map((item, index) => (
        <div key={item.id} className="p-3 border rounded space-y-3 relative bg-gray-50">
          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-white border border-red-300 rounded"
          >
            Remove
          </button>

          {/* Award/Activity Name */}
          <div className="pt-6">
            <label htmlFor={`name-${item.id}`} className="block text-sm font-medium text-gray-700">
              Award or Activity Name
            </label>
            <input
              type="text"
              name={`name-${item.id}`}
              id={`name-${item.id}`}
              value={item.name}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="e.g., Employee of the Month or Volunteer at Local Shelter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Date/Description */}
          <div>
            <label htmlFor={`dateOrDescription-${item.id}`} className="block text-sm font-medium text-gray-700">
              Date or Description (Optional)
            </label>
            <input
              type="text"
              name={`dateOrDescription-${item.id}`}
              id={`dateOrDescription-${item.id}`}
              value={item.dateOrDescription || ''}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="e.g., March 2023 or Led weekly activities for 20+ participants"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      ))}

      {/* Add Award/Activity Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Award/Activity
      </button>
    </div>
  );
};

export default AwardsActivitiesForm;
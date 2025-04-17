import React from 'react';
import { Certification } from '@/lib/types';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (index: number, field: keyof Omit<Certification, 'id'>, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Extract the field name (e.g., 'name', 'issuingOrganization', or 'date')
    const fieldName = name.split('-')[0] as keyof Omit<Certification, 'id'>;
    if (fieldName === 'name' || fieldName === 'issuingOrganization' || fieldName === 'date') {
      onChange(index, fieldName, value);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium mb-2">Certifications</h3>
      {data.map((cert, index) => (
        <div key={cert.id} className="p-3 border rounded space-y-3 relative bg-gray-50">
          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-white border border-red-300 rounded"
          >
            Remove
          </button>

          {/* Certificate Name */}
          <div className="pt-6">
            <label htmlFor={`name-${cert.id}`} className="block text-sm font-medium text-gray-700">
              Certification Name
            </label>
            <input
              type="text"
              name={`name-${cert.id}`}
              id={`name-${cert.id}`}
              value={cert.name}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="e.g., AWS Certified Solutions Architect"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Issuing Organization */}
          <div>
            <label htmlFor={`issuingOrganization-${cert.id}`} className="block text-sm font-medium text-gray-700">
              Issuing Organization (Optional)
            </label>
            <input
              type="text"
              name={`issuingOrganization-${cert.id}`}
              id={`issuingOrganization-${cert.id}`}
              value={cert.issuingOrganization || ''}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="e.g., Amazon Web Services"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor={`date-${cert.id}`} className="block text-sm font-medium text-gray-700">
              Date (Optional)
            </label>
            <input
              type="text"
              name={`date-${cert.id}`}
              id={`date-${cert.id}`}
              value={cert.date || ''}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="e.g., June 2023"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      ))}

      {/* Add Certification Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;
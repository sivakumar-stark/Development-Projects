import React from 'react';
import { PersonalInfo } from '@/lib/types';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof PersonalInfo, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium mb-2">Personal Information</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={data.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel" // Use type="tel" for phone numbers
          name="phone"
          id="phone"
          value={data.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email" // Use type="email" for email addresses
          name="email"
          id="email"
          value={data.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL (Optional)</label>
        <input
          type="url" // Use type="url" for URLs
          name="linkedin"
          id="linkedin"
          value={data.linkedin || ''} // Handle optional field
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Portfolio/Website URL (Optional)</label>
        <input
          type="url"
          name="website"
          id="website"
          value={data.website || ''} // Handle optional field
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;

import React from 'react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-md font-medium mb-2">Professional Summary</h3>
      <textarea
        name="summary"
        id="summary"
        rows={5} // Adjust rows as needed
        value={summary}
        onChange={handleChange}
        placeholder="Write a brief summary about your professional background and goals..."
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default SummaryForm;

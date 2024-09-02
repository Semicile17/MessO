import React from 'react';

const DetailsDialog = ({ form, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Form Details</h2>
        <ul>
          <li><strong>From Date:</strong> {form.fromDate}</li>
          <li><strong>To Date:</strong> {form.toDate}</li>
          <li><strong>Issue Date:</strong> {form.issueDate}</li>
          <li><strong>Status:</strong> {form.status}</li>
          <li><strong>Reason:</strong> {form.reason}</li>
          <li><strong>Address:</strong> {form.address}</li>
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsDialog;

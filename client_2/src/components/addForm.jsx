import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddFormDialog = ({ onClose, onSubmit }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reason, setReason] = useState('');
  const [address, setAddress] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { fromDate, toDate, reason, address, checked };
    onSubmit(formData);
    onClose(); // Close the dialog after submitting
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Form</h2>
        <form onSubmit={handleSubmit}>
          {/* From Date */}
          <div className="mb-4">
            <label className="block font-medium mb-2">From Date</label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy/MM/dd"
              className="w-full p-2 border rounded-md"
              placeholderText="Select from date"
              required
            />
          </div>

          {/* To Date */}
          <div className="mb-4">
            <label className="block font-medium mb-2">To Date</label>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="yyyy/MM/dd"
              className="w-full p-2 border rounded-md"
              placeholderText="Select to date"
              required
            />
          </div>

          {/* Reason for Leave */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Reason for Leave</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter reason for leave"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Permanent Address */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Permanent Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter permanent address"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mr-2"
              required
            />
            <label className="font-medium">I confirm the details above are correct.</label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFormDialog;

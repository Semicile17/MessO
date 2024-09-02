import { useState } from "react";

const SortDialog = ({ onClose, onApply }) => {
  const [sortOption, setSortOption] = useState("issueDate");

  const handleApplySort = () => {
    onApply(sortOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Sort Options</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value="issueDate"
              checked={sortOption === "issueDate"}
              onChange={() => setSortOption("issueDate")}
              className="mr-2"
            />
            Issue Date
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value="noOfDays"
              checked={sortOption === "noOfDays"}
              onChange={() => setSortOption("noOfDays")}
              className="mr-2"
            />
            Number of Days
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value="status"
              checked={sortOption === "status"}
              onChange={() => setSortOption("status")}
              className="mr-2"
            />
            Status
          </label>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleApplySort}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortDialog;

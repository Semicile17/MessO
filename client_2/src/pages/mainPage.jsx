import Sidebar from "../components/sidebar";
import FormList from "../components/formList";
import SortDialog from "../components/sortDialog";
import AddFormDialog from "../components/addForm";
import { useState } from "react";
export default function MainPage() {
    const initialFormData = [
        {
          issueDate: "2024-01-01",
          fromDate: "2024-01-01",
          toDate: "2024-01-05",
          status: "Approved",
        },
        {
          issueDate: "2024-02-09",
          fromDate: "2024-02-10",
          toDate: "2024-02-12",
          status: "Pending",
        },
        {
          issueDate: "2024-03-14",
          fromDate: "2024-03-15",
          toDate: "2024-03-18",
          status: "Rejected",
        },
      ];

  const [formData, setFormData] = useState(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSortDialogOpen, setIsSortDialogOpen] = useState(false); 

  const handleAddForm = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitForm = (formData) => {
    console.log('Form submitted:', formData);
    // Add logic here to handle the submitted form data
  };
  const handleOpenSortDialog = () => {
    setIsSortDialogOpen(true);
  };

  const handleCloseSortDialog = () => {
    setIsSortDialogOpen(false);
  };

  const handleApplySort = (sortOption) => {

    let sortedData = [...formData];

    if (sortOption === "issueDate") {
      sortedData.sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate));
    } else if (sortOption === "noOfDays") {
      sortedData.sort((a, b) => {
        const daysA = (new Date(a.toDate) - new Date(a.fromDate)) / (1000 * 3600 * 24);
        const daysB = (new Date(b.toDate) - new Date(b.fromDate)) / (1000 * 3600 * 24);
        return daysA - daysB;
      });
    } else if (sortOption === "status") {
      const statusOrder = ["Approved", "Pending", "Rejected"];
      sortedData.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    }

    setFormData(sortedData);
  };

  return (
    <div className="flex flex-col">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64 bg-[#3250cb]">
        <header>
          <ul className="flex md:space-x-40 space-x-10  font-semibold">
            <li>S.No</li>
            <li>Issue Date</li>
            <li className="hidden md:block">From Date</li>
            <li className="hidden md:block">To Date</li>
            <li>Status</li>
            <li>
            <button onClick={handleOpenSortDialog} className="border px-4">Sort</button>
            </li>
          </ul>
        </header>
        {/* Other main content */}
      </div>
      <div className="md:mx-64">
        <FormList formData={formData} />
      </div>
      <div className="w-full">
      <button
      onClick={handleAddForm}
      className="fixed bottom-8 z-10 right-8 bg-[#095D7E] hover:bg-[#137298] text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
    </button>
    {isDialogOpen && (
        <AddFormDialog onClose={handleCloseDialog} onSubmit={handleSubmitForm} />
      )}
       {isSortDialogOpen && (
          <SortDialog onClose={handleCloseSortDialog} onApply={handleApplySort} />
        )}
      </div>
    </div>
  );
}

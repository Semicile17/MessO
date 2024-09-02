import React from "react";

const FormRow = ({
  sNo,
  fromDate,
  issueDate,
  toDate,
  status,
  onShowDetails,
}) => {
  return (
    // <div className="flex items-center justify-between p-4 border-b ">
    //   <div className="w-10 text-center">{sNo}</div>
    //   <div className="w-1/5">{fromDate}</div>
    //   <div className="w-1/5">{toDate}</div>
    //   <div className="w-1/5">{status}</div>
    //   <div className="w-1/5">{issueDate}</div>
    //   <div className="w-1/5">
    //     <button
    //       className="px-4 py-2 bg-blue-500 text-white rounded"
    //       onClick={onShowDetails}
    //     >
    //       Details
    //     </button>
    //   </div>
    // </div>
    <div>
    <ul className="flex md:space-x-40 space-x-16 left-8">
      <li>{sNo}</li>
      <li>{issueDate}</li>
      <li className="hidden md:block">{fromDate}</li>
      <li className="hidden md:block">{toDate}</li>
      <li>{status}</li>
      <li>
      <button
          className="text-black text-center font-bold"
          onClick={onShowDetails}
        >
          Details
        </button>
      </li>
    </ul>
    </div>
  );
};

export default FormRow;

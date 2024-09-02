import { useState } from 'react';
import FormRow from './Forms';
import DetailsDialog from './detailsDialog';

const FormList = ({ formData }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleShowDetails = (form) => {
    setSelectedForm(form); // Set the selected form data
  };

  const handleCloseDialog = () => {
    setSelectedForm(null); // Close the dialog by setting the selected form to null
  };

  return (
    <div className="w-full">
      {formData.map((form, index) => (
        <FormRow
          key={index}
          sNo={index + 1}
          fromDate={form.fromDate}
          issueDate={form.issueDate}
          toDate={form.toDate}
          status={form.status}
          onShowDetails={() => handleShowDetails({ ...form, sNo: index + 1 })}
        />
      ))}

      {/* Show Details Dialog */}
      {selectedForm && (
        <DetailsDialog form={selectedForm} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default FormList;

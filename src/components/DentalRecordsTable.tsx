// src/components/DentalRecordsTable.tsx
import React, { useState } from "react";
import type { DentalRecord } from "../types"; // Correctly import DentalRecord
import { format } from "date-fns";
import AddDentalRecordOverlay from "./AddDentalRecordOverlay"; // Ensure this is imported

// New type for data coming from the overlay (user input)
// This interface defines the shape of data *as it comes from the form*.
interface NewDentalRecordFormData {
  date: string; // Storing as string from input type="date"
  procedure: string; // Can be predefined or 'Other' text
  totalCost: number;
  paymentLeft: number;
  status: DentalRecord['status'] | '';
  notes: string;
}

interface DentalRecordsTableProps {
  records: DentalRecord[];
  // CORRECTED: onAddDentalRecord now expects a full DentalRecord object,
  // as that's what handleSaveNewDentalRecord constructs before passing it up.
  onAddDentalRecord: (newDentalRecord: DentalRecord) => void;
  // onSelectDentalRecord?: (record: DentalRecord) => void; // If you later want selection within the table
  // selectedDentalRecordId?: string; // If you later want highlighting within the table
}


const DentalRecordsTable: React.FC<DentalRecordsTableProps> = ({ records, onAddDentalRecord }) => {
  // Log all dental records received by this component
  console.log("Dental Records for current patient:", records);

  const [filterDate, setFilterDate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 3; // As seen in the image

  // State to control the visibility of the AddDentalRecordOverlay
  const [showAddDentalRecordOverlay, setShowAddDentalRecordOverlay] = useState(false);

  // Internal handler for the "Add New Record" button click
  const handleOpenAddDentalRecordOverlay = (): void => {
    setShowAddDentalRecordOverlay(true);
    // You could also call onAddDentalRecord here without data if the parent
    // needs to know the overlay was opened.
  };

  // Internal handler to close the Add Dental Record overlay
  const handleCloseAddDentalRecordOverlay = (): void => {
    setShowAddDentalRecordOverlay(false);
  };

  // Internal handler for saving a new dental record from the overlay
  const handleSaveNewDentalRecord = (newRecordFormData: NewDentalRecordFormData): void => {
    console.log("New dental record data saved (from DentalRecordsTable overlay):", newRecordFormData);
    // In a real application, you would send this newRecordFormData to your backend API.
    // The backend would then generate the ID, createdAt, and updatedAt.
    // For mock data, we'll simulate it here before calling the parent's onAddDentalRecord.

    // Convert date string to Date object. Handle potential invalid date if string is empty/bad.
    const recordDate = newRecordFormData.date ? new Date(newRecordFormData.date) : new Date('Invalid Date');

    // Simulate ID and timestamps for mock data
    const newRecordWithMeta: DentalRecord = {
      id: `dr${records.length + 1}`, // Simple mock ID generation
      patientId: 'patient-id-placeholder', // This would come from context or be selected in the form
      date: recordDate, // Use the converted Date object
      procedure: newRecordFormData.procedure,
      totalCost: newRecordFormData.totalCost,
      paymentLeft: newRecordFormData.paymentLeft,
      status: newRecordFormData.status as DentalRecord['status'], // Cast to correct status type
      notes: newRecordFormData.notes,
      createdAt: new Date(), // Set to current time
      updatedAt: new Date(), // Set to current time
    };

    onAddDentalRecord(newRecordWithMeta); // Notify parent with the complete new dental record data
    alert('New dental record added! (Check console for data)');
    handleCloseAddDentalRecordOverlay(); // Close overlay after save
  };

  const filteredRecords = records.filter((record) => {
    // Ensure record.date is a valid Date object before formatting
    const isRecordDateValid = record.date instanceof Date && !isNaN(record.date.getTime());

    const matchesDate = filterDate
      ? isRecordDateValid && format(record.date, "yyyy-MM-dd") === filterDate
      : true;
    const matchesStatus = filterStatus
      ? record.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchesDate && matchesStatus;
  });

  // Pagination logic:
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Function to change the current page.
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Helper function to safely format dates
  const safeFormatDate = (date: Date | undefined, formatStr: string): string => {
    return date instanceof Date && !isNaN(date.getTime()) ? format(date, formatStr) : 'N/A';
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Dental Records</h3>
        <button
          onClick={handleOpenAddDentalRecordOverlay} // Attach click handler
          className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-indigo-700 transition-colors duration-200"
        >
          <span className="text-xl">+</span> Add New Record
        </button>
      </div>

      {/* Filters for date and status */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </div>

      {/* Table section, allowing horizontal scrolling if content overflows */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* Table headers with adjusted Tailwind widths for 10 columns */}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[7%]">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[18%]">Procedure</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Total Cost</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Payment Left</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%]">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Actions</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[9%]">Created At</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[9%]">Modified At</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[9%]">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.length > 0 ? (
              currentRecords.map((record) => (
                <tr key={record.id}>
                  {/* Table data cells with Tailwind styling - Removed whitespace between <td> tags */}
                  <td className="px-4 py-3 text-sm text-gray-900 text-left">{record.id}</td><td className="px-4 py-3 text-sm text-gray-900 text-left">{safeFormatDate(record.date, "MMM dd, yyyy")}</td><td className="px-4 py-3 text-sm text-gray-900 text-left">{record.procedure}</td><td className="px-4 py-3 text-sm text-gray-900 text-left">
                    {record.totalCost.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}
                  </td><td className="px-4 py-3 text-sm text-gray-900 text-left">
                    {record.paymentLeft.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}
                  </td><td className="px-4 py-3 text-sm text-left">
                    <span className={`status ${record.status.toLowerCase().replace(" ", "-")}`}>{record.status}</span>
                  </td><td className="px-4 py-3 text-sm font-medium text-left">
                    <button className="text-blue-600 hover:text-blue-800 mr-2 transition-colors duration-150">Edit</button>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-150">View</button>
                  </td><td className="px-4 py-3 text-sm text-gray-500 text-left">{safeFormatDate(record.createdAt, "MMM dd, yyyy")}</td><td className="px-4 py-3 text-sm text-gray-500 text-left">{safeFormatDate(record.updatedAt, "MMM dd, yyyy")}</td><td className="px-4 py-3 text-sm text-gray-500 text-left">{record.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                  No dental records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {filteredRecords.length > recordsPerPage && (
        <div className="flex justify-end items-center mt-4">
          <span className="text-sm text-gray-700 mr-2">
            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} entries
          </span>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-150"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium transition-colors duration-150
                  ${currentPage === number
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-150"
            >
              &gt;
            </button>
          </nav>
        </div>
      )}
      {/* Add Dental Record Overlay - rendered directly within DentalRecordsTable */}
      <AddDentalRecordOverlay
        isOpen={showAddDentalRecordOverlay}
        onClose={handleCloseAddDentalRecordOverlay}
        onSave={handleSaveNewDentalRecord}
      />
    </div>
  );
};

export default DentalRecordsTable;

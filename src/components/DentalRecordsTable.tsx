// src/components/DentalRecordsTable.tsx
import React, { useState } from "react";
import type { DentalRecord } from "../types";
import { format } from "date-fns";

interface DentalRecordsTableProps {
  records: DentalRecord[];
}

const DentalRecordsTable: React.FC<DentalRecordsTableProps> = ({ records }) => {
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 3; // As seen in the image

  const filteredRecords = records.filter((record) => {
    const matchesDate = filterDate
      ? format(record.date, "yyyy-MM-dd") === filterDate
      : true;
    const matchesStatus = filterStatus
      ? record.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchesDate && matchesStatus;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    // Replaced 'dental-records-table-container' with Tailwind classes for background, padding, rounded corners, and shadow
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Dental Records</h3>
        {/* Replaced 'primary-btn' with Tailwind classes */}
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-blue-700 transition-colors duration-200">
          <span className="text-xl">+</span> Add New Record
        </button>
      </div>

      {/* Filters */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Replaced 'dental-records-table' with Tailwind table-fixed and w-full */}
        <table className="min-w-full divide-y divide-gray-200 table-fixed w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* Table headers with Tailwind padding, alignment, font, and specific widths */}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Procedure</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">Total Cost</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">Payment Left</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]">Actions</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.length > 0 ? (
              currentRecords.map((record) => (
                <tr key={record.id}>
                  {/* Table data cells with Tailwind padding, text size, color, and alignment */}
                  <td className="px-4 py-3 text-sm text-gray-900 text-left">{format(record.date, "MMM dd")}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-left">{record.procedure}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-left">
                    {record.totalCost.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-left">
                    {record.paymentLeft.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-left">
                    {/* span.status relies on global status classes from index.css */}
                    <span className={`status ${record.status.toLowerCase().replace(" ", "-")}`}>{record.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-left">
                    <button className="text-blue-600 hover:text-blue-800 mr-2 transition-colors duration-150">Edit</button>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-150">View</button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-left">{record.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
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
    </div>
  );
};

export default DentalRecordsTable;

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

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="dental-records-table-container bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Dental Records</h3>
        <button className="primary-btn flex items-center gap-2">
          <span className="text-xl">+</span> Add New Record
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-md"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Procedure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Left
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.length > 0 ? (
              currentRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(record.date, "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.procedure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.totalCost.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.paymentLeft.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`status ${record.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {record.notes}
                  </td>
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

      {/* Pagination */}
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
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === number
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
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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
// src/components/PatientDetail.tsx
import React, { useState } from "react";
import type { Patient, DentalRecord, Appointment } from "../types"; // Added Appointment type
import DentalRecordsTable from "./DentalRecordsTable";
import DentalChartUpload from "./DentalChartUpload";
import MedicalReceiptsUpload from "./MedicalReceiptsUpload";
import { dentalRecords, appointments as allAppointments } from "../data/MockData"; // Renamed appointments to allAppointments
import { format, isFuture, isPast } from 'date-fns'; // Import date-fns for date comparison and formatting

interface PatientDetailProps {
  patient: Patient;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
  const [activeTab, setActiveTab] = useState<"personal" | "dental">("personal"); // Default to personal info

  // Filter dental records for the current patient
  const patientDentalRecords = dentalRecords.filter(
    (record) => record.patientId === patient.id
  );

  // Filter appointments for the current patient
  const patientAppointments = allAppointments.filter(
    (appt) => appt.patientId === patient.id
  );

  // Filter upcoming appointments for the current patient
  const upcomingAppointments = patientAppointments.filter(
    (appt) => isFuture(appt.time)
  ).sort((a, b) => a.time.getTime() - b.time.getTime()); // Sort by time ascending

  // Filter past appointments (history) for the current patient
  const pastAppointments = patientAppointments.filter(
    (appt) => isPast(appt.time)
  ).sort((a, b) => b.time.getTime() - a.time.getTime()); // Sort by time descending (most recent first)

  // State for pagination in Appointment History
  const [currentHistoryPage, setCurrentHistoryPage] = useState<number>(1);
  const historyRecordsPerPage = 3; // Number of history records per page as seen in image

  const indexOfLastHistoryRecord = currentHistoryPage * historyRecordsPerPage;
  const indexOfFirstHistoryRecord = indexOfLastHistoryRecord - historyRecordsPerPage;
  const currentHistoryRecords = pastAppointments.slice(
    indexOfFirstHistoryRecord,
    indexOfLastHistoryRecord
  );
  const totalHistoryPages = Math.ceil(pastAppointments.length / historyRecordsPerPage);

  const paginateHistory = (pageNumber: number) => setCurrentHistoryPage(pageNumber);

  return (
    // Replaced 'patient-detail-container' with Tailwind bg, rounded, shadow, and padding
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Patient Info Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          {/* h2 with Tailwind font size, weight, and color */}
          <h2 className="text-2xl font-bold text-gray-800">
            {patient.name}
          </h2>
          {/* Patient summary: Age, Gender, Phone, Email */}
          <p className="text-gray-600 text-sm">
            {patient.age} years, {patient.gender} | {patient.phone} |{" "}
            {patient.email}
          </p>
        </div>
        {/* Schedule Appointment Button - Replaced 'primary-btn' with Tailwind classes */}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors duration-200">
          <span className="text-xl">+</span> Schedule Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-lg font-medium transition-colors duration-200 ease-in-out
            ${activeTab === "personal"
              ? "text-purple-600 border-b-2 border-purple-600" // Active tab uses a purple shade
              : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={`ml-4 py-2 px-4 text-lg font-medium transition-colors duration-200 ease-in-out
            ${activeTab === "dental"
              ? "text-purple-600 border-b-2 border-purple-600" // Active tab uses a purple shade
              : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("dental")}
        >
          Dental Records
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "personal" && (
          <div className="personal-info-content">
            {/* Grid for Medical History and Upcoming Appointments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Medical History Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm"> {/* Increased padding slightly for card */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Medical History</h3>
                <p className="text-gray-600 text-sm mb-4">Patient's medical information and history</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>{patient.medicalHistory?.includes('Penicillin') ? 'Penicillin' : 'No known allergies'}</li> {/* Simplified */}
                    <li>Local anesthetics</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Current Medications</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Lisinopril 10mg daily</li>
                    <li>Vitamin D3 supplement</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Medical Conditions</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Mild hypertension</li>
                    <li>Seasonal allergies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Last Dental Cleaning</h4>
                  <p className="text-gray-600 text-sm">
                    {/* Corrected format string */}
                    {patient.lastVisit ? format(patient.lastVisit, "MMMM dd, 'Jamboree'") : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Upcoming Appointments Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm"> {/* Increased padding slightly for card */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Appointments</h3>
                <p className="text-gray-600 text-sm mb-4">Scheduled dental appointments</p>

                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map(appt => (
                      <div key={appt.id} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-800">{appt.type}</p>
                          <p className="text-sm text-gray-600">Dr. Sarah Wilson</p> {/* Hardcoded for now */}
                          {/* Corrected format string */}
                          <p className="text-xs text-gray-500">{format(appt.time, "MMMM dd, 'Jamboree' - hh:mm a")}</p>
                        </div>
                        <span className={`status ${appt.status.toLowerCase().replace(' ', '-')}`}>
                          {appt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming appointments.</p>
                )}
              </div>
            </div>

            {/* Appointment History Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Appointment History</h3>
              <p className="text-gray-600 text-sm mb-4">Past dental appointments</p>

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-x-4 py-3 px-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-t-lg">
                  <div className="col-span-1">Date</div>
                  <div className="col-span-2">Treatment</div>
                  <div className="col-span-1">Dentist</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Notes</div>
                  <div className="col-span-1"></div> {/* For padding/actions if needed */}
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {currentHistoryRecords.length > 0 ? (
                  currentHistoryRecords.map((appt) => (
                    <div key={appt.id} className="grid grid-cols-7 gap-x-4 py-3 px-2 bg-white hover:bg-gray-50 text-sm text-gray-900">
                      {/* Corrected format string */}
                      <div className="col-span-1">{format(appt.time, "MMM dd, 'Jamboree'")}</div>
                      <div className="col-span-2">{appt.type}</div>
                      <div className="col-span-1">Dr. Michael Chen</div> {/* Hardcoded for now */}
                      <div className="col-span-1">
                        <span className={`status ${appt.status.toLowerCase().replace(' ', '-')}`}>
                          {appt.status}
                        </span>
                      </div>
                      <div className="col-span-1 text-gray-600">{appt.type === 'Cavity Filling' ? 'Filled cavity in tooth #18' : 'Normal cleaning procedure...'}</div> {/* Simplified note */}
                      <div className="col-span-1 text-right">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-gray-500">
                    No past appointments found.
                  </div>
                )}
              </div>

              {/* Pagination controls */}
              {pastAppointments.length > historyRecordsPerPage && (
                <div className="flex justify-end items-center mt-4">
                  <span className="text-sm text-gray-700 mr-2">
                    Showing {indexOfFirstHistoryRecord + 1}-{Math.min(indexOfLastHistoryRecord, pastAppointments.length)} of {pastAppointments.length} entries
                  </span>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => paginateHistory(currentHistoryPage - 1)}
                      disabled={currentHistoryPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-150"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalHistoryPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginateHistory(number)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium transition-colors duration-150 ${
                          currentHistoryPage === number
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => paginateHistory(currentHistoryPage + 1)}
                      disabled={currentHistoryPage === totalHistoryPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-150"
                    >
                      &gt;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "dental" && (
          <div className="dental-records-content">
            {/* Dental Records Table */}
            <div className="mb-8">
              <DentalRecordsTable records={patientDentalRecords} />
            </div>

            {/* Dental Chart and Medical Receipts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DentalChartUpload patientName={patient.name} />
              <MedicalReceiptsUpload patientName={patient.name} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;

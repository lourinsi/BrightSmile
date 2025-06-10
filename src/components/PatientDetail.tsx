// src/components/PatientDetail.tsx
import React, { useState } from "react";
import type { Patient, DentalRecord } from "../types";
import DentalRecordsTable from "./DentalRecordsTable";
import DentalChartUpload from "./DentalChartUpload";
import MedicalReceiptsUpload from "./MedicalReceiptsUpload";
import { dentalRecords } from "../data/MockData"; // Assuming mock dental records

interface PatientDetailProps {
  patient: Patient;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
  const [activeTab, setActiveTab] = useState<"personal" | "dental">("dental");

  // Filter dental records for the current patient
  const patientDentalRecords = dentalRecords.filter(
    (record) => record.patientId === patient.id
  );

  return (
    <div className="patient-detail-container bg-white rounded-xl shadow p-6">
      {/* Patient Info Header */}
      <div className="patient-info-header flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {patient.name}
          </h2>
          <p className="text-gray-600">
            {patient.age} years, {patient.gender} | {patient.phone} |{" "}
            {patient.email}
          </p>
        </div>
        <button className="primary-btn flex items-center gap-2">
          <span className="text-xl">+</span> Schedule Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs flex border-b border-gray-200 mb-6">
        <button
          className={`tab-button py-2 px-4 text-lg font-medium ${
            activeTab === "personal"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={`tab-button py-2 px-4 text-lg font-medium ${
            activeTab === "dental"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("dental")}
        >
          Dental Records
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "personal" && (
          <div className="personal-info-content">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Date of Birth:</strong> {patient.dob ? patient.dob.toDateString() : 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {patient.address}
              </p>
              <p>
                <strong>Occupation:</strong> {patient.occupation}
              </p>
              <p>
                <strong>Medical History:</strong> {patient.medicalHistory || 'None'}
              </p>
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
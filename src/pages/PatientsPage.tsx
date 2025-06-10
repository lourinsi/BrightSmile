// src/pages/PatientsPage.tsx
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import PatientList from "../components/PatientList"; // Import the PatientList component
import Logo from "../components/Logo";
import PatientDetail from "../components/PatientDetail";
import { patients } from "../data/MockData"; // Import mock patient data
import type { Patient } from "../types"; // Import Patient type definition

const PatientsPage: React.FC = () => {
  // State to manage the currently selected patient.
  // This state determines which patient's details are shown in the main content area.
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    patients[0] || null // Initialize with the first patient from mock data
  );

  // Handler for the "Add Patient" button in the PatientList sidebar.
  const handleAddPatient = (): void => {
    console.log("Add patient clicked on Patients Page");
    // In a real app, this might navigate to a patient creation form or open a modal.
  };

  // Handler for when a patient is clicked in the PatientList component.
  // This function updates the 'selectedPatient' state, triggering a re-render
  // of PatientDetail with the newly selected patient's information.
  const handlePatientSelect = (patient: Patient): void => {
    setSelectedPatient(patient);
  };

  return (
    <div className="dashboard-container">
      {/* Top navigation bar */}
      <div className="topbar flex items-center">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div className="navigation">
          <Navigation />
        </div>
      </div>

      {/* Main content area: sidebar (PatientList) and main content (PatientDetail) */}
      <div className="dashboard-content flex">
        {/* Sidebar section using the PatientList component */}
        <div className="sidebar">
          <PatientList
            patients={patients} // Pass the full list of patients
            onAddPatient={handleAddPatient} // Pass the add patient handler
            onSelectPatient={handlePatientSelect} // Pass the handler to select a patient from the list
            selectedPatientId={selectedPatient?.id} // Pass the ID of the selected patient for highlighting
          />
        </div>

        {/* Main content section using the PatientDetail component */}
        <div className="main-content flex-1 p-4">
          {/* Render PatientDetail only if a patient is selected */}
          {selectedPatient ? (
            <PatientDetail patient={selectedPatient} />
          ) : (
            <div className="text-center text-gray-500 mt-20">
              Select a patient from the list to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;

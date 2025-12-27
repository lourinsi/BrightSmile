// src/pages/PatientsPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import Navigation from "../components/Navigation";
import PatientList from "../components/PatientList";
import Logo from "../components/Logo";
import PatientDetail from "../components/PatientDetail";
import { patients } from "../data/MockData"; // Import mock patient data
import type { Patient } from "../types"; // Import Patient type definition

const PatientsPage: React.FC = () => {
  // Get the patientName from the URL parameters.
  // This will be 'undefined' if the URL is just '/patients',
  // or the encoded patient name (e.g., 'Sarah%20Johnson') if it's '/patients/Sarah%20Johnson'.
  const { patientName } = useParams<{ patientName?: string }>();

  // Determine the currently selected patient.
  // If a patientName is present in the URL, find that patient.
  // Otherwise, default to the first patient in the mock data.
  // This hook ensures that `selectedPatient` updates automatically when `patientName` in the URL changes.
  // Explicitly typing `selectedPatient` here helps TypeScript and linters
  // recognize that the `Patient` type is being used.
  const selectedPatient: Patient | undefined = React.useMemo(() => {
    // Log the patientName from URL and the decoded version for debugging
    console.log("patientName from URL:", patientName);

    if (patientName) {
      // Decode the URL parameter before comparing to the patient's name
      const decodedPatientName = decodeURIComponent(patientName);
      console.log("Decoded patientName:", decodedPatientName);
      const foundPatient = patients.find(p => p.name === decodedPatientName);
      console.log("Found patient:", foundPatient);
      return foundPatient;
    }
    // If no patientName in URL, default to the first patient
    console.log("Defaulting to first patient:", patients[0]);
    return patients[0]; // Assuming patients[0] exists, otherwise it will be undefined
  }, [patientName]); // Re-calculate only when patientName changes

  // Function to handle the "Add Patient" button click in the sidebar.
  const handleAddPatient = (): void => {
    console.log("Add patient clicked on Patients Page");
    // In a real application, this would likely open a modal or navigate to a new form.
  };

  return (
    <div className="dashboard-container">
      {/* Top navigation bar, consistent across the application */}
      <div className="topbar flex items-center">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div className="navigation">
          <Navigation />
        </div>
      </div>

      {/* Main content area, structured with a sidebar and a main content section */}
      <div className="dashboard-content flex">
        {/* Sidebar displaying the list of patients */}
        <div className="sidebar">
          <PatientList
            patients={patients} // Pass the full list of patients
            onAddPatient={handleAddPatient} // Pass the handler for adding a patient
            // Removed onSelectPatient prop as PatientList now handles navigation directly
            selectedPatientId={selectedPatient?.id} // Pass the ID of the currently selected patient to highlight it
          />
        </div>

        {/* Main content area where details of the selected patient are shown */}
        <div className="main-content flex-1 p-4">
          {/* Conditionally render PatientDetail if a patient is selected. */}
          {selectedPatient ? (
            <PatientDetail patient={selectedPatient} />
          ) : (
            // Fallback message if no patient is selected (e.g., if patients array is empty or name doesn't match)
            <div className="text-center text-gray-500 mt-20">
              Patient not found. Please select from the list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;

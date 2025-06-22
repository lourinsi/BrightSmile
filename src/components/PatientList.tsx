// src/components/PatientList.tsx
import React, { useState } from 'react'; // Import useState
import type { Patient } from '../types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AddPatientOverlay from './AddPatientOverlay'; // Import the overlay component

// Define the type for the new patient data expected from the overlay (can be imported from types/index.ts later)
interface NewPatientFormData {
  fullName: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other' | '';
  phoneNumber: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PatientListProps {
  patients: Patient[]; // An array of patient objects to display.
  // This prop will now primarily signal to the parent that an 'add patient' action occurred,
  // potentially allowing the parent to re-fetch/update its patient data.
  onAddPatient: (newPatient?: NewPatientFormData) => void; // Modified to pass newPatientData or be called empty for initial click
  selectedPatientId?: string; // Optional ID of the currently selected patient, used for highlighting in the UI.
}

const PatientList: React.FC<PatientListProps> = ({ patients, onAddPatient, selectedPatientId }) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  // State to control the visibility of the AddPatientOverlay, managed internally
  const [showAddPatientOverlay, setShowAddPatientOverlay] = useState(false);

  const handlePatientClick = (patient: Patient): void => {
    // Navigate to the patient's detail page using their name in the URL.
    // encodeURIComponent is used to ensure the name is URL-safe (e.g., handles spaces).
    navigate(`/patients/${encodeURIComponent(patient.name)}`);
  };

  // Internal handler for the "Add Patient" button click
  const handleOpenAddPatientOverlay = (): void => {
    setShowAddPatientOverlay(true);
    onAddPatient(); // Notify parent that "Add Patient" was clicked (without data yet)
  };

  // Internal handler to close the Add Patient overlay
  const handleCloseAddPatientOverlay = (): void => {
    setShowAddPatientOverlay(false);
  };

  // Internal handler for saving a new patient from the overlay
  const handleSaveNewPatient = (newPatientData: NewPatientFormData): void => {
    console.log("New patient data saved (from PatientList):", newPatientData);
    // In a real application, you would send this data to your backend API
    // and then refresh your patient list. For now, it's just logged.
    alert('New patient added! (Check console for data)'); // Using alert for now, replace with custom modal
    onAddPatient(newPatientData); // Notify parent with the new patient data
    handleCloseAddPatientOverlay(); // Close overlay after save
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Patients</h2>
        {/* Button now calls the internal handler to open the overlay */}
        <button onClick={handleOpenAddPatientOverlay} className="bg-indigo-600 text-white px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-indigo-700 transition-colors duration-200">
          <span>+</span> Add Patient
        </button>
      </div>
      <div className="mb-4">
        <input type="text" placeholder="Search patients..." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex flex-col gap-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`flex justify-between items-center py-2 px-3 border-b border-gray-200 last:border-b-0 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out
              ${selectedPatientId === patient.id ? 'bg-purple-50 border-l-4 border-purple-400' : 'hover:bg-gray-100'}
            `}
            onClick={() => handlePatientClick(patient)}
          >
            <div className="flex items-center gap-3">
              <img src={patient.profileImg || '/default-avatar.png'} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold text-gray-800 text-base">{patient.name}</h4>
                <p className="text-sm text-gray-500">Last visit: {format(patient.lastVisit, "MMM dd, 'yyyy'")}</p>
              </div>
            </div>
            <div className="ml-auto text-right flex-shrink-0">
              <span className={`status-tag ${patient.status?.toLowerCase().replace(' ', '-')}`}>{patient.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Overlay - rendered directly within PatientList */}
      <AddPatientOverlay
        isOpen={showAddPatientOverlay}
        onClose={handleCloseAddPatientOverlay}
        onSave={handleSaveNewPatient}
      />
    </div>
  );
};

export default PatientList;

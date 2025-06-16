// src/components/PatientList.tsx
import React from 'react';
import type { Patient } from '../types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface PatientListProps {
  patients: Patient[]; // An array of patient objects to display.
  onAddPatient: () => void; // A function to call when the "Add Patient" button is clicked.
  // Note: onSelectPatient prop is removed from here as navigation handles selection externally.
  selectedPatientId?: string; // Optional ID of the currently selected patient, used for highlighting in the UI.
}

const PatientList: React.FC<PatientListProps> = ({ patients, onAddPatient, selectedPatientId }) => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handlePatientClick = (patient: Patient): void => {
    // Navigate to the patient's detail page using their name in the URL.
    // encodeURIComponent is used to ensure the name is URL-safe (e.g., handles spaces).
    navigate(`/patients/${encodeURIComponent(patient.name)}`);
  };

  return (
    // Replaced 'patient-list-container' with direct Tailwind classes for padding
    <div className="p-4">
      {/* Replaced 'patient-list-header' with Tailwind flex utilities and margin */}
      <div className="flex justify-between items-center mb-4">
        {/* Converted h2 to Tailwind for font size, weight, and color */}
        <h2 className="text-xl font-semibold text-gray-800">Patients</h2>
        {/* Updated 'Add Patient' button to a complementing color (indigo) and thinner/rectangular */}
        <button onClick={onAddPatient} className="bg-indigo-600 text-white px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-indigo-700 transition-colors duration-200">
          <span>+</span> Add Patient
        </button>
      </div>
      {/* Replaced 'search-container' with Tailwind margin */}
      <div className="mb-4">
        {/* Input field already uses Tailwind classes */}
        <input type="text" placeholder="Search patients..." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      {/* Replaced 'patients-list' with flex column if needed, otherwise no explicit styling necessary here */}
      <div className="flex flex-col gap-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            // Updated 'patient-item' highlight colors to light purple shades
            className={`flex justify-between items-center py-2 px-3 border-b border-gray-200 last:border-b-0 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out
              ${selectedPatientId === patient.id ? 'bg-purple-50 border-l-4 border-purple-400' : 'hover:bg-gray-100'}
            `}
            onClick={() => handlePatientClick(patient)} // Use the new click handler from previous iteration
          >
            {/* Replaced 'patient-info' with Tailwind flex and gap */}
            <div className="flex items-center gap-3">
              {/* Image with Tailwind width, height, rounded, and object-fit */}
              <img src={patient.profileImg || '/default-avatar.png'} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                {/* h4 with Tailwind font size, weight, and color */}
                <h4 className="font-semibold text-gray-800 text-base">{patient.name}</h4>
                {/* p with Tailwind font size, color */}
                <p className="text-sm text-gray-500">Last visit: {format(patient.lastVisit, "MMM dd, 'Jamboree'")}</p> {/* Corrected format string */}
              </div>
            </div>
            {/* Replaced 'patient-status' with Tailwind classes */}
            {/* Added ml-auto to push it to the far right, and text-right for internal alignment. flex-shrink-0 ensures it doesn't shrink below its content size. */}
            <div className="ml-auto text-right flex-shrink-0">
              {/* span.status-tag relies on global status-tag classes from index.css */}
              <span className={`status-tag ${patient.status?.toLowerCase().replace(' ', '-')}`}>{patient.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;

// src/components/PatientList.tsx
import React from 'react';
import type { Patient } from '../types';
import { format } from 'date-fns';

// Define the expected properties (props) for the PatientList component.
interface PatientListProps {
  patients: Patient[]; // An array of patient objects to display.
  onAddPatient: () => void; // A function to call when the "Add Patient" button is clicked.
  // This is the crucial prop: A function that takes a Patient object as an argument
  // and is called when a specific patient in the list is selected (clicked).
  // It's optional (with '?') in case it's not always needed, but in PatientsPage, it is.
  onSelectPatient?: (patient: Patient) => void;
  // An optional ID of the currently selected patient, used for highlighting in the UI.
  selectedPatientId?: string;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onAddPatient, onSelectPatient, selectedPatientId }) => {
  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        <button onClick={onAddPatient} className="add-patient-btn">
          <span>+</span> Add Patient
        </button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search patients..." className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="patients-list">
        {patients.map((patient) => (
          <div
            key={patient.id}
            // Dynamically apply CSS classes: 'bg-blue-50' and 'border-l-4'
            // if this patient's ID matches the selectedPatientId.
            // Otherwise, apply 'hover:bg-gray-50' and 'cursor-pointer'.
            className={`patient-item ${selectedPatientId === patient.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50 cursor-pointer'}`}
            // Attach the onClick event listener.
            // If onSelectPatient prop is provided, call it with the current patient object.
            onClick={() => onSelectPatient && onSelectPatient(patient)}
          >
            <div className="patient-info">
              <img src={patient.profileImg || '/default-avatar.png'} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                <p className="text-sm text-gray-500">Last visit: {format(patient.lastVisit, 'yyyy-MM-dd')}</p>
              </div>
            </div>
            <div className="patient-status">
              <span className={`status-tag ${patient.status?.toLowerCase().replace(' ', '-')}`}>{patient.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
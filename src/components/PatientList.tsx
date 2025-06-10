import React from 'react';
import type { Patient } from '../types';
import { format } from 'date-fns';

interface PatientListProps {
  patients: Patient[];
  onAddPatient: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onAddPatient }) => {
  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        <button onClick={onAddPatient} className="add-patient-btn">
          <span>+</span> Add Patient
        </button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search patients..." />
      </div>
      <div className="patients-list">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-item">
            <div className="patient-info">
              <img src={patient.profileImg || '/default-avatar.png'} alt={patient.name} />
              <div>
                <h4>{patient.name}</h4>
                <p>Last visit: {format(patient.lastVisit, 'yyyy-MM-dd')}</p>
              </div>
            </div>
            <div className="patient-status">
              <span className={`status-tag ${patient.status?.toLowerCase()}`}>{patient.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
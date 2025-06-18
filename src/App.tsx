// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientsPage from './pages/PatientsPage';
import './index.css';
import { patients } from './data/MockData'; // Import patients to get default redirect

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Redirect /patients to the first patient's detail page by default if no patientName is provided */}
        {/* This ensures that when you navigate to /patients, it automatically loads a patient. */}
        <Route path="/patients" element={
          patients.length > 0 ? (
            <Navigate to={`/patients/${encodeURIComponent(patients[0].name)}`} replace />
          ) : (
            // Fallback if no patients exist to redirect to, perhaps dashboard or an empty state page
            <Navigate to="/" replace />
          )
        } />
        {/* Dynamic route for individual patient pages. The '?' makes :patientName optional. */}
        {/* This allows PatientsPage to render for both /patients/PatientName and /patients (after redirect) */}
        <Route path="/patients/:patientName" element={<PatientsPage />} />
        {/* Add more routes here as your application grows */}
      </Routes>
    </Router>
  );
};

export default App;

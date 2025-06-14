import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import "./index.css";
import PatientsPage from "./pages/PatientsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<PatientsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

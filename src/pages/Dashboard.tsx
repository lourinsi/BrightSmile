// src/pages/Dashboard.tsx
import React from "react";
import Navigation from "../components/Navigation";
import PatientList from "../components/PatientList";
import MetricCard from "../components/MetricCard";
import AppointmentList from "../components/AppointmentList";
import Calendar from "../components/Calendar";
import ActivityList from "../components/ActivityList";

import { patients, appointments, activities } from "../data/MockData";

const Dashboard: React.FC = () => {
  const handleAddPatient = (): void => {
    console.log("Add patient clicked");
  };

  const handleNewAppointment = (): void => {
    console.log("New appointment clicked");
  };

  return (
    <div className="dashboard-container">
      <Navigation />
      <div className="dashboard-content flex">
        {/* Sidebar */}
        <div className="sidebar">
          <PatientList patients={patients} onAddPatient={handleAddPatient} />
        </div>

        {/* Main Content */}
        <div className="main-content flex-1 p-4">
          {/* Welcome and Buttons */}
          <div className="welcome-section flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Welcome back, Dr. Smith</h1>
            <div className="action-buttons flex gap-2">
              <button className="primary-btn">
                <span>+</span> New Appointment
              </button>
              <button className="secondary-btn">
                <span>📅</span> View Schedule
              </button>
            </div>
          </div>
          {/* Metrics */}
          <div className="metrics-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Total Patients"
              value={2834}
              subtext="+12 this week"
              icon={<span>👥</span>}
            />
            <MetricCard
              title="Today's Appointments"
              value={12}
              subtext="4 remaining"
              icon={<span>📅</span>}
            />
            <MetricCard
              title="Weekly Revenue"
              value="PHP 51,029"
              subtext="+23% from last week"
              icon={<span>💰</span>}
            />
            <MetricCard
              title="Patient Satisfaction"
              value="98%"
              subtext="+2% this month"
              icon={<span>⭐</span>}
            />
          </div>
          {/* Appointments + Calendar */}
          <div className="flex gap-4 mb-4 h-[400px]">
            {/* Today's Appointments + Calendar side by side */}
          </div>{" "}
          <div className="flex-1 flex gap-4">
            {/* Appointments */}
            <div className="flex-1 bg-white p-4 rounded-xl shadow h-full overflow-auto">
              <AppointmentList appointments={appointments} />
            </div>

            {/* Calendar */}
            <div className="w-64 bg-white p-4 rounded-xl shadow h-full">
              <Calendar />
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white p-4 rounded-xl shadow">
            <ActivityList activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

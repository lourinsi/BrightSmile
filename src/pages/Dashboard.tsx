// src/pages/Dashboard.tsx
import React from "react";
import Navigation from "../components/Navigation";
import PatientList from "../components/PatientList";
import MetricCard from "../components/MetricCard";
import AppointmentList from "../components/AppointmentList";
import Calendar from "../components/Calendar";
import ActivityList from "../components/ActivityList";

import { patients, appointments, activities } from "../data/MockData";
import Logo from "../components/Logo";

const Dashboard: React.FC = () => {
  const handleAddPatient = (): void => {
    console.log("Add patient clicked");
  };
  

  const handleNewAppointment = (): void => {
    console.log("New appointment clicked");
  };

  return (
    // Replaced 'dashboard-container' with Tailwind flex utilities for full height
    <div className="flex flex-col h-screen">
      {/* Replaced 'topbar' with Tailwind classes for flex, alignment, background, and border */}
      <div className="flex items-center bg-white border-b border-gray-200 py-2">
        {/* 'logo-wrapper' is no longer needed as Logo component now contains its own styling */}
        <Logo />
        {/* 'navigation' can keep its custom class or be converted if its internal components are fully Tailwind */}
        <div className="navigation flex-1 pr-8"> {/* Added flex-1 and pr-8 for alignment */}
          <Navigation />
        </div>

      </div>
      {/* Replaced 'dashboard-content' with Tailwind flex utilities */}
      <div className="flex flex-1">
        {/* Replaced 'sidebar' with Tailwind width, background, border, padding, and overflow classes */}
        <div className="w-[280px] bg-white border-r border-gray-200 p-4 overflow-y-auto flex-shrink-0">
          <PatientList patients={patients} onAddPatient={handleAddPatient} />
        </div>

        {/* Replaced 'main-content' with Tailwind flex, padding, and overflow classes */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Replaced 'welcome-section' with Tailwind flex utilities and margin */}
          <div className="flex justify-between items-center mb-6">
            {/* 'h1' already uses Tailwind classes */}
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Smith</h1>
            {/* 'action-buttons' already uses Tailwind flex and gap */}
            <div className="flex gap-2">
              {/* Converted 'primary-btn' to Tailwind classes */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200 ease-in-out">
                <span>+</span> New Appointment
              </button>
              {/* Converted 'secondary-btn' to Tailwind classes */}
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-200 transition duration-200 ease-in-out">
                <span>📅</span> View Schedule
              </button>
            </div>
          </div>
          {/* Replaced 'metrics-row' with Tailwind grid utilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
          {/* Adjusted grid columns for Appointment List and Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-8"> {/* Changed to 2fr_1fr */}
            {/* Appointments component container */}
            <div className="bg-white p-4 rounded-xl shadow h-full overflow-auto">
              <AppointmentList appointments={appointments} />
            </div>

            {/* Calendar component container */}
            <div className="bg-white p-4 rounded-xl shadow h-full">
              <Calendar />
            </div>
          </div>
          {/* Recent Activity container - adjusted margin-top and padding */}
          <div className="bg-white p-2 rounded-xl shadow mt-0"> {/* Changed mt-0, p-6 */}

            <ActivityList activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

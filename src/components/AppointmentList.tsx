// src/components/AppointmentList.tsx
import React from 'react';
import type { Appointment } from '../types';
import { format } from 'date-fns';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    // Replaced 'appointments-section' with Tailwind margin-bottom.
    // The parent div in Dashboard.tsx provides the bg, padding, rounded, shadow.
    <div className="mb-6">
      {/* Converted h2 to Tailwind for font size, weight, and color */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Appointments</h2>
      {/* 'appointments-list' is primarily a container for flex items */}
      <div className="flex flex-col gap-3"> {/* Added gap for spacing between items */}
        {appointments.map((appointment) => (
          // Converted 'appointment-item' to Tailwind flex, justification, alignment, padding, margin, border-radius, and shadow
          <div key={appointment.id} className="flex justify-between items-center bg-white p-4 mb-0 rounded-lg shadow-sm">
            {/* 'time' with Tailwind for font-weight, min-width, and text-alignment */}
            <div className="font-bold text-gray-800 min-w-[4.5rem] text-left">
              {format(appointment.time, 'hh:mm a')}
            </div>
            {/* 'appointment-details' with Tailwind flex-grow and no specific text alignment here
                as individual text elements (h4, p) will handle it. */}
            <div className="flex-grow text-center"> {/* Keeping text-center here as requested earlier for the block of text */}
              {/* h4 and p with Tailwind classes for font size, weight, color,
                  text-alignment is now inherited from parent .appointment-details */}
              <h4 className="text-base font-medium text-gray-800">{appointment.patientName}</h4>
              <p className="text-sm text-gray-600">{appointment.type}</p>
            </div>
            {/* 'appointment-duration' with Tailwind for font size, color, min-width, and text-alignment */}
            <div className="text-sm text-gray-600 min-w-[4.5rem] text-left"> {/* Changed from text-right to text-left */}
              {appointment.duration >= 60
                ? `${Math.floor(appointment.duration / 60)} hour${Math.floor(appointment.duration / 60) !== 1 ? 's' : ''}`
                : `${appointment.duration} mins`}
            </div>
            {/* 'appointment-status' with Tailwind for min-width and text-alignment */}
            <div className="min-w-[4rem] text-right"> {/* Remains text-right */}
              {/* span.status already relies on global .status classes, which are handled in index.css */}
              <span className={`status ${appointment.status.toLowerCase().replace(' ', '-')}`}>{appointment.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;

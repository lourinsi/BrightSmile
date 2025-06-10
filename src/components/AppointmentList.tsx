import React from 'react';
import type { Appointment } from '../types';
import { format } from 'date-fns';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <div className="appointments-section">
      <h2>Today's Appointments</h2>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-item">
            <div className="time">{format(appointment.time, 'hh:mm a')}</div>
            <div className="appointment-details">
              <h4>{appointment.patientName}</h4>
              <p>{appointment.type}</p>
            </div>
            <div className="appointment-duration">
              {appointment.duration >= 60 
                ? `${Math.floor(appointment.duration / 60)} hour${Math.floor(appointment.duration / 60) !== 1 ? 's' : ''}` 
                : `${appointment.duration} mins`}
            </div>
            <div className="appointment-status">
              <span className={`status ${appointment.status.toLowerCase().replace(' ', '-')}`}>{appointment.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
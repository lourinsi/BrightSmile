// src/data/mockData.ts
import type { Patient, Appointment, Activity } from '../types';

export const patients: Patient[] = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    lastVisit: new Date(2024, 0, 15), 
    status: 'Scheduled',
    profileImg: '/patient1.jpg'
  },
  { 
    id: '2', 
    name: 'Mister Beast', 
    lastVisit: new Date(2024, 0, 15), 
    status: 'To pay',
    profileImg: '/patient2.jpg'
  },
  { 
    id: '3', 
    name: 'Lebanon James', 
    lastVisit: new Date(2024, 0, 15), 
    status: 'Overdue',
    profileImg: '/patient3.jpg'
  }
];

export const appointments: Appointment[] = [
  { 
    id: '1', 
    patientId: '1', 
    patientName: 'Sarah Johnson', 
    time: new Date(2024, 4, 1, 9, 0), 
    duration: 60, 
    type: 'Dental Cleaning', 
    status: 'Confirmed'
  },
  { 
    id: '2', 
    patientId: '4', 
    patientName: 'Michael Brown', 
    time: new Date(2024, 4, 1, 10, 30), 
    duration: 90, 
    type: 'Root Canal', 
    status: 'In Progress'
  },
  { 
    id: '3', 
    patientId: '5', 
    patientName: 'Emily Davis', 
    time: new Date(2024, 4, 1, 14, 0), 
    duration: 30, 
    type: 'Consultation', 
    status: 'Scheduled'
  },
  { 
    id: '4', 
    patientId: '6', 
    patientName: 'Robert Wilson', 
    time: new Date(2024, 4, 1, 15, 30), 
    duration: 60, 
    type: 'Crown Fitting', 
    status: 'Scheduled'
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    patientName: 'Emma Thompson',
    description: 'Added new X-ray results',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    description: 'Follow-up treatment',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: '3',
    patientName: 'Sarah Johnson',
    description: 'Initial dental assessment',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  }
];

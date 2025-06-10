<<<<<<< HEAD
=======
// src/types/index.ts
>>>>>>> backup-before-force
export interface Patient {
  id: string;
  name: string;
  lastVisit: Date;
<<<<<<< HEAD
  status?: 'Scheduled' | 'To pay' | 'Overdue';
  profileImg?: string;
=======
  status?: 'Scheduled' | 'To pay' | 'Overdue' | 'Completed';
  profileImg?: string;
  // New fields from PatientDetail and image
  age?: number;
  gender?: string;
  phone?: string;
  email?: string;
  dob?: Date; // Date of Birth
  address?: string;
  occupation?: string;
  medicalHistory?: string;
>>>>>>> backup-before-force
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: Date;
  duration: number; // in minutes
  type: string;
  status: 'Confirmed' | 'In Progress' | 'Scheduled' | 'Completed';
}

export interface Activity {
  id: string;
  patientName: string;
  description: string;
  timestamp: Date;
}

export interface MetricCard {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
<<<<<<< HEAD
=======
}

export interface DentalRecord {
  id: string;
  patientId: string;
  date: Date;
  procedure: string;
  totalCost: number;
  paymentLeft: number;
  status: 'In Progress' | 'Completed' | 'Scheduled'; // Added specific statuses for dental records
  notes?: string;
>>>>>>> backup-before-force
}
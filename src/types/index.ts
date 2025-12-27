// src/types/index.ts
export interface Patient {
  id: string;
  name: string;
  lastVisit: Date;
  status?: 'Scheduled' | 'To pay' | 'Overdue' | 'Completed';
  profileImg?: string;
  age?: number;
  gender?: string;
  phone?: string;
  email?: string;
  dob?: Date; // Date of Birth
  address?: string;
  occupation?: string;
  medicalHistory?: string;
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
}

// Ensure DentalRecord is properly defined and exported here
export interface DentalRecord {
  id: string;
  patientId: string;
  date: Date;
  procedure: string;
  totalCost: number;
  paymentLeft: number;
  status: 'In Progress' | 'Completed' | 'Scheduled';
  notes?: string;
  createdAt: Date; // Added
  updatedAt: Date; // Added
}

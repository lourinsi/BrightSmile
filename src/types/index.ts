export interface Patient {
  id: string;
  name: string;
  lastVisit: Date;
  status?: 'Scheduled' | 'To pay' | 'Overdue';
  profileImg?: string;
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
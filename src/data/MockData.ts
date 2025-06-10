// src/data/MockData.ts
import { addDays, subDays } from 'date-fns';
import type { Patient, Appointment, Activity, DentalRecord } from '../types';

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastVisit: new Date(2024, 0, 15),
    status: 'Scheduled',
    profileImg: '/patient1.jpg', // Placeholder, ensure this path is correct or use external URL
    age: 32,
    gender: 'Female',
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com',
    dob: new Date(1992, 4, 20), // May 20, 1992
    address: '123 Main St, Anytown, USA',
    occupation: 'Software Engineer',
    medicalHistory: 'No known allergies, routine check-ups only.',
  },
  {
    id: '2',
    name: 'Mister Beast',
    lastVisit: new Date(2024, 0, 15),
    status: 'To pay',
    profileImg: '/patient2.jpg', // Placeholder, ensure this path is correct or use external URL
    age: 26,
    gender: 'Male',
    phone: '(555) 987-6543',
    email: 'mister.beast@example.com',
    dob: new Date(1998, 4, 7), // May 7, 1998
    address: '456 Oak Ave, Villagetown, USA',
    occupation: 'Content Creator',
    medicalHistory: 'Allergies to certain nuts, no dental-related medical history.',
  },
  {
    id: '3',
    name: 'Lebanon James',
    lastVisit: new Date(2024, 0, 15),
    status: 'Overdue',
    profileImg: '/patient3.jpg', // Placeholder, ensure this path is correct or use external URL
    age: 39,
    gender: 'Male',
    phone: '(555) 111-2222',
    email: 'lebanon.james@example.com',
    dob: new Date(1985, 11, 30), // December 30, 1985
    address: '789 Pine Ln, Cityville, USA',
    occupation: 'Professional Athlete',
    medicalHistory: 'History of wisdom tooth extraction, otherwise healthy.',
  },
  {
    id: '4',
    name: 'Michael Brown',
    lastVisit: new Date(2023, 10, 20),
    status: 'To pay',
    profileImg: '/default-avatar.png',
    age: 45, gender: 'Male', phone: '(555) 333-4444', email: 'michael.b@example.com',
  },
  {
    id: '5',
    name: 'Emily Davis',
    lastVisit: new Date(2024, 2, 10),
    status: 'Scheduled',
    profileImg: '/default-avatar.png',
    age: 29, gender: 'Female', phone: '(555) 555-6666', email: 'emily.d@example.com',
  },
  {
    id: '6',
    name: 'Robert Wilson',
    lastVisit: new Date(2023, 7, 5),
    status: 'Overdue',
    profileImg: '/default-avatar.png',
    age: 58, gender: 'Male', phone: '(555) 777-8888', email: 'robert.w@example.com',
  },
  {
    id: '7',
    name: 'Emma Thompson',
    lastVisit: new Date(2024, 3, 1),
    status: 'Scheduled',
    profileImg: '/default-avatar.png',
    age: 28, gender: 'Female', phone: '(555) 123-9876', email: 'emma.t@example.com',
  },
  {
    id: '8',
    name: 'Michael Chen',
    lastVisit: new Date(2024, 3, 25),
    status: 'Completed',
    profileImg: '/default-avatar.png',
    age: 35, gender: 'Male', phone: '(555) 234-8765', email: 'michael.c@example.com',
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    time: new Date(2024, 4, 1, 9, 0),
    duration: 60,
    type: 'Dental Cleaning',
    status: 'Confirmed',
  },
  {
    id: '2',
    patientId: '4',
    patientName: 'Michael Brown',
    time: new Date(2024, 4, 1, 10, 30),
    duration: 90,
    type: 'Root Canal',
    status: 'In Progress',
  },
  {
    id: '3',
    patientId: '5',
    patientName: 'Emily Davis',
    time: new Date(2024, 4, 1, 14, 0),
    duration: 30,
    type: 'Consultation',
    status: 'Scheduled',
  },
  {
    id: '4',
    patientId: '6',
    patientName: 'Robert Wilson',
    time: new Date(2024, 4, 1, 15, 30),
    duration: 60,
    type: 'Crown Fitting',
    status: 'Scheduled',
  },
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

export const dentalRecords: DentalRecord[] = [
  {
    id: 'dr1',
    patientId: '1', // Sarah Johnson
    date: new Date('2023-09-15'),
    procedure: 'Regular Cleaning',
    totalCost: 1200,
    paymentLeft: 400,
    status: 'In Progress',
    notes: 'Normal cleaning procedure, no issues.',
  },
  {
    id: 'dr2',
    patientId: '1', // Sarah Johnson
    date: new Date('2023-06-22'),
    procedure: 'X-Ray & Checkup',
    totalCost: 2500,
    paymentLeft: 0,
    status: 'Completed',
    notes: 'Minor cavity detected in lower left molar.',
  },
  {
    id: 'dr3',
    patientId: '1', // Sarah Johnson
    date: new Date('2023-03-10'),
    procedure: 'Cavity Filling',
    totalCost: 2500,
    paymentLeft: 0,
    status: 'Completed',
    notes: 'Filled cavity in tooth #18.',
  },
  {
    id: 'dr4',
    patientId: '2', // Mister Beast
    date: new Date('2024-01-10'),
    procedure: 'Dental Cleaning',
    totalCost: 1000,
    paymentLeft: 0,
    status: 'Completed',
    notes: 'Routine cleaning, good oral hygiene.',
  },
  {
    id: 'dr5',
    patientId: '3', // Lebanon James
    date: new Date('2023-11-20'),
    procedure: 'Crown Placement',
    totalCost: 15000,
    paymentLeft: 5000,
    status: 'In Progress',
    notes: 'Crown prep for tooth #3. Patient needs to schedule second appointment.',
  },
];
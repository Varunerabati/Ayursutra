export interface User {
  username: string;
  password: string;
  role: 'patient' | 'doctor' | 'admin';
  profile: PatientProfile | DoctorProfile | AdminProfile;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  therapyType: string;
  totalSessions: number;
  completedSessions: number;
  progress: number;
  lastSession: {
    date: string;
    practitioner: string;
    type: string;
  };
  upcomingSession: {
    date: string;
    time: string;
    practitioner: string;
    type: string;
  };
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
}

export interface AdminProfile {
  id: string;
  name: string;
  role: string;
}

export interface Feedback {
  id: string;
  patientId: string;
  date: string;
  symptoms: string;
  improvements: string;
  sideEffects: string;
  rating: number;
}

export interface Report {
  id: string;
  patientId: string;
  sessionNumber: number;
  date: string;
  type: string;
  practitioner: string;
  preview: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

// Dummy Users
export const dummyUsers: User[] = [
  {
    username: 'patient1',
    password: 'pass123',
    role: 'patient',
    profile: {
      id: 'P001',
      name: 'Rajesh Kumar',
      age: 45,
      therapyType: 'Panchakarma - Detox',
      totalSessions: 21,
      completedSessions: 12,
      progress: 57,
      lastSession: {
        date: '2025-01-10',
        practitioner: 'Dr. Priya Sharma',
        type: 'Abhyanga'
      },
      upcomingSession: {
        date: '2025-01-15',
        time: '10:00 AM',
        practitioner: 'Dr. Priya Sharma',
        type: 'Swedana'
      }
    }
  },
  {
    username: 'patient2',
    password: 'pass123',
    role: 'patient',
    profile: {
      id: 'P002',
      name: 'Meera Patel',
      age: 38,
      therapyType: 'Panchakarma - Rejuvenation',
      totalSessions: 28,
      completedSessions: 8,
      progress: 29,
      lastSession: {
        date: '2025-01-08',
        practitioner: 'Dr. Arjun Reddy',
        type: 'Shirodhara'
      },
      upcomingSession: {
        date: '2025-01-16',
        time: '2:00 PM',
        practitioner: 'Dr. Arjun Reddy',
        type: 'Nasya'
      }
    }
  },
  {
    username: 'doctor1',
    password: 'pass123',
    role: 'doctor',
    profile: {
      id: 'D001',
      name: 'Dr. Priya Sharma',
      specialization: 'Panchakarma Specialist',
      experience: 12,
      rating: 4.8
    }
  },
  {
    username: 'doctor2',
    password: 'pass123',
    role: 'doctor',
    profile: {
      id: 'D002',
      name: 'Dr. Arjun Reddy',
      specialization: 'Ayurvedic Medicine',
      experience: 8,
      rating: 4.6
    }
  },
  {
    username: 'admin1',
    password: 'admin123',
    role: 'admin',
    profile: {
      id: 'A001',
      name: 'Admin User',
      role: 'System Administrator'
    }
  }
];

// Dummy Feedback Data
export const dummyFeedback: Feedback[] = [
  {
    id: 'F001',
    patientId: 'P001',
    date: '2025-01-10',
    symptoms: 'Joint pain reduced significantly',
    improvements: 'Better sleep, increased energy levels',
    sideEffects: 'Mild drowsiness after treatment',
    rating: 5
  },
  {
    id: 'F002',
    patientId: 'P001',
    date: '2025-01-05',
    symptoms: 'Digestive issues improving',
    improvements: 'Appetite has increased, better digestion',
    sideEffects: 'None',
    rating: 4
  },
  {
    id: 'F003',
    patientId: 'P002',
    date: '2025-01-08',
    symptoms: 'Stress levels decreased',
    improvements: 'Mental clarity improved, feeling more relaxed',
    sideEffects: 'Temporary headache',
    rating: 4
  }
];

// Dummy Reports Data
export const dummyReports: Report[] = [
  {
    id: 'R001',
    patientId: 'P001',
    sessionNumber: 12,
    date: '2025-01-10',
    type: 'Progress Report',
    practitioner: 'Dr. Priya Sharma',
    preview: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/22c55e/ffffff?text=Progress+Report+12'
  },
  {
    id: 'R002',
    patientId: 'P001',
    sessionNumber: 10,
    date: '2025-01-03',
    type: 'Assessment Report',
    practitioner: 'Dr. Priya Sharma',
    preview: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/22c55e/ffffff?text=Assessment+Report+10'
  },
  {
    id: 'R003',
    patientId: 'P002',
    sessionNumber: 8,
    date: '2025-01-08',
    type: 'Progress Report',
    practitioner: 'Dr. Arjun Reddy',
    preview: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/22c55e/ffffff?text=Progress+Report+8'
  }
];

// Time slots for scheduling
export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

// Available dates for next 30 days
export const availableDates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return date.toISOString().split('T')[0];
});

// Generate dummy appointments
export const dummyAppointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2025-01-15',
    time: '10:00 AM',
    type: 'Swedana',
    status: 'scheduled'
  },
  {
    id: 'A002',
    patientId: 'P002',
    doctorId: 'D002',
    date: '2025-01-16',
    time: '2:00 PM',
    type: 'Nasya',
    status: 'scheduled'
  },
  // Add more dummy appointments as needed
];

// Get booked slots for a specific date
export const getBookedSlots = (date: string): string[] => {
  const appointments = dummyAppointments.filter(apt => apt.date === date);
  return appointments.map(apt => apt.time);
};

// Get available slots for a specific date
export const getAvailableSlots = (date: string): string[] => {
  const bookedSlots = getBookedSlots(date);
  return timeSlots.filter(slot => !bookedSlots.includes(slot));
};

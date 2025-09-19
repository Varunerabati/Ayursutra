import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'patient' | 'doctor' | 'admin';
  profile: any;
}

interface AppointmentData {
  date: string;
  time: string;
  practitioner: string;
  type: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  upcomingSession: AppointmentData | null;
  setUpcomingSession: (session: AppointmentData | null) => void;
  updateUpcomingSession: (session: AppointmentData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [upcomingSession, setUpcomingSession] = useState<AppointmentData | null>(null);

  const updateUpcomingSession = (session: AppointmentData) => {
    setUpcomingSession(session);
    
    // Also update the user profile to keep it in sync
    if (user) {
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          upcomingSession: session
        }
      };
      setUser(updatedUser);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      upcomingSession,
      setUpcomingSession,
      updateUpcomingSession
    }}>
      {children}
    </AppContext.Provider>
  );
};
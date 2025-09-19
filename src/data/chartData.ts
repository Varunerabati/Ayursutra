export const generateProgressData = (userId: string) => {
  const baseData = [
    { date: '2024-12-15', progress: 15, sessions: 3, rating: 4 },
    { date: '2024-12-20', progress: 22, sessions: 5, rating: 4 },
    { date: '2024-12-25', progress: 28, sessions: 7, rating: 5 },
    { date: '2025-01-01', progress: 35, sessions: 9, rating: 4 },
    { date: '2025-01-05', progress: 42, sessions: 11, rating: 5 },
    { date: '2025-01-10', progress: 57, sessions: 12, rating: 5 },
    { date: '2025-01-15', progress: 65, sessions: 14, rating: 4 },
    { date: '2025-01-20', progress: 72, sessions: 16, rating: 5 }
  ];

  // Customize data based on user
  if (userId === 'P002') {
    return [
      { date: '2024-12-20', progress: 10, sessions: 2, rating: 3 },
      { date: '2024-12-25', progress: 15, sessions: 4, rating: 4 },
      { date: '2025-01-01', progress: 20, sessions: 6, rating: 4 },
      { date: '2025-01-08', progress: 29, sessions: 8, rating: 4 },
      { date: '2025-01-15', progress: 38, sessions: 10, rating: 5 },
      { date: '2025-01-20', progress: 45, sessions: 12, rating: 4 }
    ];
  }

  return baseData;
};

export const generateSessionsData = (userId: string) => {
  const baseData = [
    { type: 'Abhyanga', count: 4, color: '#22c55e' },
    { type: 'Swedana', count: 3, color: '#3b82f6' },
    { type: 'Shirodhara', count: 2, color: '#8b5cf6' },
    { type: 'Nasya', count: 2, color: '#f59e0b' },
    { type: 'Basti', count: 1, color: '#ef4444' }
  ];

  if (userId === 'P002') {
    return [
      { type: 'Shirodhara', count: 3, color: '#22c55e' },
      { type: 'Abhyanga', count: 2, color: '#3b82f6' },
      { type: 'Nasya', count: 2, color: '#8b5cf6' },
      { type: 'Swedana', count: 1, color: '#f59e0b' }
    ];
  }

  return baseData;
};

export const generateRatingsData = (userId: string) => {
  return [
    { date: '2024-12-15', rating: 4, symptoms: 'Mild', energy: 7 },
    { date: '2024-12-20', rating: 4, symptoms: 'Mild', energy: 7 },
    { date: '2024-12-25', rating: 5, symptoms: 'Minimal', energy: 8 },
    { date: '2025-01-01', rating: 4, symptoms: 'Minimal', energy: 8 },
    { date: '2025-01-05', rating: 5, symptoms: 'None', energy: 9 },
    { date: '2025-01-10', rating: 5, symptoms: 'None', energy: 9 },
    { date: '2025-01-15', rating: 4, symptoms: 'None', energy: 8 },
    { date: '2025-01-20', rating: 5, symptoms: 'None', energy: 9 }
  ];
};
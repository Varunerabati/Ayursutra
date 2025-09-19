import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeContext';
import Login from './components/Login';
import CallsPage from './components/CallsPage';
import Dashboard from './components/Dashboard';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [currentCallId, setCurrentCallId] = useState('');
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    // Simulación de autenticación
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleJoinCall = (callId: string) => {
    setIsInCall(true);
    setCurrentCallId(callId);
  };

  const handleLeaveCall = () => {
    setIsInCall(false);
    setCurrentCallId('');
    navigate('/calls');
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to="/calls" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/calls" 
          element={
            isLoggedIn ? 
            <CallsPage 
              onJoinCall={handleJoinCall} 
              onLeaveCall={handleLeaveCall}
              onNavigateToDashboard={handleNavigateToDashboard}
              isInCall={isInCall}
              currentCallId={currentCallId}
            /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn && isInCall ? 
            <Dashboard 
              onLeaveCall={handleLeaveCall}
              callId={currentCallId}
            /> : 
            <Navigate to={isLoggedIn ? "/calls" : "/login"} replace />
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={isLoggedIn ? "/calls" : "/login"} replace />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

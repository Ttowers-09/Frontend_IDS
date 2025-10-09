import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeContext';
import { CollaborationProvider } from './contexts/CollaborationContext';
import Login from './components/Login';
import CallsPage from './components/CallsPage';
import Dashboard from './components/Dashboard';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [currentCallId, setCurrentCallId] = useState('');
  const [currentUser, setCurrentUser] = useState<{id: string, name: string, isHost: boolean} | null>(null);
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    // Simulación de autenticación
    if (username && password) {
      setIsLoggedIn(true);
      // Simular información de usuario
      setCurrentUser({
        id: `user-${Date.now()}`,
        name: username === 'demo' ? 'Demo User' : username,
        isHost: username === 'admin' || username === 'demo' // Demo y admin son hosts
      });
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

  const handleBackToCall = () => {
    navigate('/calls');
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
              currentUser={currentUser || undefined}
            /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn && isInCall && currentUser ? 
            <CollaborationProvider
              callId={currentCallId}
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
              isHost={currentUser.isHost}
            >
              <Dashboard 
                onLeaveCall={handleLeaveCall}
                onBackToCall={handleBackToCall}
                callId={currentCallId}
                currentUser={currentUser}
              />
            </CollaborationProvider> : 
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

import React, { useState } from 'react';
import './Login.css';

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Aquí puedes agregar la lógica de autenticación
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
    // Aquí puedes agregar la navegación al registro
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Sección izquierda - Formulario de login */}
        <div className="login-form-section">
          <h1 className="login-title">Login</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="login-input"
                required
              />
              <div className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="login-input"
                required
              />
              <div className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? 
            <button 
              type="button" 
              onClick={handleSignUp}
              className="signup-link"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Sección derecha - Welcome */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">WELCOME BACK!</h2>
            <p className="welcome-text">
              ISD-IA Organization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
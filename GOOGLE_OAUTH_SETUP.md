# 🔐 Configuración de Autenticación con Google OAuth

## 📋 Configuración del Frontend

### 1. Variables de Entorno (.env)
```env
# URL del Backend
REACT_APP_BACKEND_URL=http://localhost:3001

# Google OAuth Client ID (Frontend)
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Configuración de OAuth
REACT_APP_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

### 2. Instalación de Dependencias
```bash
# Para Google OAuth
npm install @google-cloud/local-auth google-auth-library

# O para React Google Login
npm install react-google-login
# O la versión más nueva
npm install @google-oauth/google-one-tap
```

## 🛠️ Configuración del Backend

### 1. Variables de Entorno Backend (.env)
```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# Database URL
DATABASE_URL=postgresql://username:password@localhost:5432/your_db

# OAuth Redirect URLs
FRONTEND_URL=http://localhost:3000
OAUTH_SUCCESS_REDIRECT=http://localhost:3000/dashboard
OAUTH_FAILURE_REDIRECT=http://localhost:3000/login?error=oauth_failed
```

### 2. Rutas de Autenticación (Express.js ejemplo)
```javascript
// routes/auth.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const router = express.Router();

// Configurar Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Buscar o crear usuario en la base de datos
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0].value,
          provider: 'google'
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Ruta de inicio de OAuth
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generar JWT token
    const token = jwt.sign(
      { 
        id: req.user.id, 
        email: req.user.email,
        name: req.user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Redirigir al frontend con el token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// Ruta para logout
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
```

### 3. Middleware de Autenticación
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
```

## 🔗 Integración Frontend Actualizada

### 1. Componente Login Mejorado
```typescript
// Hook para manejar Google OAuth
const useGoogleAuth = () => {
  const handleGoogleLogin = () => {
    // Opción 1: Redirigir a endpoint del backend
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  const handleGoogleCallback = (token: string) => {
    // Guardar token en localStorage o context
    localStorage.setItem('authToken', token);
    // Redirigir al dashboard
    window.location.href = '/dashboard';
  };

  return { handleGoogleLogin, handleGoogleCallback };
};
```

### 2. Componente de Callback
```typescript
// components/AuthCallback.tsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } else if (error) {
      navigate('/login?error=' + error);
    }
  }, [searchParams, navigate]);

  return <div>Processing authentication...</div>;
};
```

### 3. Interceptor para Requests
```typescript
// utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar tokens expirados
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 🔧 Setup en Google Cloud Console

### 1. Crear Proyecto en Google Cloud
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto o seleccionar existente
3. Habilitar Google+ API

### 2. Configurar OAuth 2.0
1. Ir a "Credenciales" → "Crear credenciales" → "ID de cliente OAuth 2.0"
2. Tipo de aplicación: "Aplicación web"
3. Orígenes autorizados de JavaScript:
   - `http://localhost:3000` (desarrollo)
   - `https://yourdomain.com` (producción)
4. URIs de redirección autorizados:
   - `http://localhost:3001/auth/google/callback` (desarrollo)
   - `https://api.yourdomain.com/auth/google/callback` (producción)

### 3. Configurar Pantalla de Consentimiento
1. Configurar información de la aplicación
2. Agregar dominios autorizados
3. Definir scopes: `profile`, `email`

## 🚀 Implementación Actual

El componente Login ya está preparado con:
- ✅ Botón de "Continue with Google" estilizado
- ✅ Función `handleGoogleLogin` lista para integrar
- ✅ Callback `onGoogleLogin` para manejar respuesta
- ✅ Loading states para feedback visual
- ✅ Fallback al login tradicional

## 🔄 Flujo de Autenticación

1. **Usuario hace click en "Continue with Google"**
2. **Frontend redirige a:** `${BACKEND_URL}/auth/google`
3. **Google muestra pantalla de consentimiento**
4. **Usuario autoriza la aplicación**
5. **Google redirige a:** `${BACKEND_URL}/auth/google/callback`
6. **Backend procesa usuario y genera JWT**
7. **Backend redirige a:** `${FRONTEND_URL}/auth/success?token=jwt_token`
8. **Frontend procesa token y redirige a dashboard**

¡El componente Login ya está listo para conectarse con tu backend de Google OAuth! 🎉
// Tipos para la autenticación
export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  provider: 'google';
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'email';
  token: string;
}

// Utilidades para el manejo de tokens
export const authUtils = {
  // Guardar token en localStorage
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },

  // Obtener token del localStorage
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  // Remover token del localStorage
  removeToken: (): void => {
    localStorage.removeItem('authToken');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    if (!token) return false;

    try {
      // Verificar si el token no ha expirado
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  },

  // Obtener información del usuario del token
  getUserInfo: (): any | null => {
    const token = authUtils.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      };
    } catch {
      return null;
    }
  }
};

// Configuración para Google OAuth (para uso futuro)
export const googleAuthConfig = {
  clientId: import.meta.env?.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: import.meta.env?.VITE_OAUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  scope: 'profile email',
  responseType: 'code',
  accessType: 'offline',
  includeGrantedScopes: true
};

// URLs del backend
export const authEndpoints = {
  googleLogin: `${import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001'}/auth/google`,
  googleCallback: `${import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001'}/auth/google/callback`,
  logout: `${import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001'}/auth/logout`,
  me: `${import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001'}/auth/me`
};

// Hook personalizado para autenticación (para uso futuro con React Context)
export const useAuth = () => {
  const isLoggedIn = authUtils.isAuthenticated();
  const user = authUtils.getUserInfo();

  const login = (token: string) => {
    authUtils.setToken(token);
    window.location.reload(); // O usar un state manager más sofisticado
  };

  const logout = () => {
    authUtils.removeToken();
    window.location.href = '/login';
  };

  const loginWithGoogle = () => {
    window.location.href = authEndpoints.googleLogin;
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
    loginWithGoogle
  };
};
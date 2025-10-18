import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { authUtils, googleAuthConfig } from '../utils/auth';
import { useEffect } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // no loading state needed for Google-only flow here
  const gsiButtonRef = useRef<HTMLDivElement | null>(null);
  const [gsiReady, setGsiReady] = useState(false);

  // We no longer support local username/password sign-in.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // noop - keep to satisfy form submit semantics for accessibility
  };

  const handleGoogleLogin = async () => {
    // trigger GSI prompt or redirect to backend OAuth endpoint
    try {
      // Usar Google Identity Services (client-side) para obtener id_token
      // google.accounts.id.prompt() mostrará el selector / prompt
      // Si GSI no está disponible, caeremos a la redirección al backend
      if ((window as any).google && (window as any).google.accounts) {
        (window as any).google.accounts.id.prompt();
      } else {
        // Do not redirect to backend by default for client-side flow.
        // Inform the user that Google Sign-In isn't ready and suggest reloading.
        alert('Google Sign-In is not available in this browser session. Please reload the page or try again.');
      }
      
      // Opción 2: Para implementación con popup (comentado por ahora)
      /*
      const popup = window.open(
        authEndpoints.googleLogin,
        'google-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      // Escuchar el mensaje del popup con el resultado
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          popup?.close();
          if (onGoogleLogin) {
            onGoogleLogin(event.data.user);
          } else {
            onLogin(event.data.user.email, 'google_oauth');
          }
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          popup?.close();
          console.error('Google login failed:', event.data.error);
        }
        
        window.removeEventListener('message', handleMessage);
        setIsGoogleLoading(false);
      };
      
      window.addEventListener('message', handleMessage);
      */
      
      } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  useEffect(() => {
    // Inicializar GSI si está cargado
    try {
      const clientId = googleAuthConfig.clientId;
      // Exponer clientId en la consola para facilitar debugging en el navegador
      console.log('GSI clientId=', clientId);
      if ((window as any).google && clientId) {
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: async (resp: any) => {
            // resp.credential es el ID token (JWT de Google)
            const token = resp?.credential;
            if (token) {
              try {
                // Enviar token al backend para validación y obtener claims
                const r = await fetch((import.meta.env?.VITE_BACKEND_URL || 'http://localhost:8080') + '/api/auth/google', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ idToken: token })
                });

                if (!r.ok) {
                  const t = await r.text();
                  console.error('Backend token validation failed', r.status, t);
                  return;
                }

                // Guardamos el token localmente y redirigimos
                authUtils.setToken(token);
                window.location.href = '/dashboard';
              } catch (e) {
                console.error('Token post failed', e);
              }
            }
          }
        });

        // Render the official GSI button into our container (if present)
        try {
          if (gsiButtonRef.current) {
            (window as any).google.accounts.id.renderButton(gsiButtonRef.current, {
              theme: 'outline',
              size: 'large',
              text: 'signin_with'
            });
            setGsiReady(true);
          }
        } catch (e) {
          // ignore render errors and fallback to prompt on click
          console.warn('GSI renderButton failed', e);
          setGsiReady(false);
        }
      }
    } catch (e) {
      console.warn('GSI init failed', e);
    }
  }, []);

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 to-gray-800 p-md">
      {/* Simplified background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-card p-2xl space-y-2xl">
          {/* Header */}
          <div className="text-center space-y-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-sm">
              <h1 className="text-3xl font-bold text-white">
                ISD-IA Organization
              </h1>
              <p className="text-base text-gray-400">
                Advanced Cybersecurity Platform
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-xl">
            {/* Google OAuth - official GSI button (rendered) */}
            <div className="space-y-lg">
              <div ref={gsiButtonRef} aria-hidden={false} />

              {/* Fallback visible button if GSI didn't render or isn't ready */}
              {!gsiReady && (
                <div className="my-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-md hover:opacity-90"
                    aria-label="Sign in with Google"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.35 11.1h-9.18v2.92h5.26c-.23 1.32-1.17 2.44-2.5 3.13v2.6h4.04c2.36-2.17 3.71-5.37 3.71-8.89 0-.6-.05-1.18-.18-1.75z" fill="#4285F4"/>
                      <path d="M12.17 22c2.7 0 4.97-.9 6.63-2.44l-4.04-2.6c-1.12.75-2.55 1.2-3.99 1.2-3.07 0-5.67-2.07-6.6-4.86h-4.1v3.05c1.66 3.3 5.05 5.65 10.7 5.65z" fill="#34A853"/>
                      <path d="M5.57 13.3c-.25-.75-.4-1.55-.4-2.4s.15-1.65.4-2.4v-3.05h-4.1c-.82 1.6-1.3 3.42-1.3 5.45s.48 3.85 1.3 5.45l4.10-3.05z" fill="#FBBC05"/>
                      <path d="M12.17 6.5c1.47 0 2.8.5 3.85 1.47l2.88-2.88c-1.66-1.54-3.93-2.47-6.73-2.47-5.65 0-9.04 2.35-10.7 5.65l4.1 3.05c.93-2.79 3.53-4.86 6.6-4.86z" fill="#EA4335"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="relative py-md">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-lg bg-gray-800/80 text-gray-400 font-medium">or continue with email</span>
                </div>
              </div>
            </div>
            {/* Only Google sign-in + demo access (no username/password) */}
            <div className="space-y-md pt-md">
              {/* demo access kept for local development */}
              <motion.button
                type="button"
                onClick={() => {
                  onLogin('demo', 'demo');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary w-full py-lg px-lg rounded-xl text-lg font-medium"
              >
                <div className="flex items-center justify-center gap-sm">
                  <Shield className="w-5 h-5" />
                  <span>Demo Access</span>
                </div>
              </motion.button>
            </div>
          </form>

          {/* Footer */}
          <div className="pt-md border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400 mb-xs">
              Don't have an account?
            </p>
            <button className="text-primary hover:text-primary-light transition-colors text-sm font-medium">
              Request Access
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-xs mt-lg text-xs text-gray-500">
          <Shield className="w-3 h-3" />
          <span>Protected by 256-bit SSL encryption</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

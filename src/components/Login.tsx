import React, { useEffect, useRef, useState } from 'react';
import { authUtils, googleAuthConfig } from '../utils/auth';

const Login: React.FC = () => {
	const gsiButtonRef = useRef<HTMLDivElement | null>(null);
	const [gsiReady, setGsiReady] = useState(false);

	const handleGoogleLogin = async () => {
		try {
			if ((window as any).google && (window as any).google.accounts) {
				(window as any).google.accounts.id.prompt();
			} else {
				alert('Google Sign-In is not available. Please reload the page.');
			}
		} catch (e) {
			console.error('Error triggering Google Sign-In', e);
		}
	};

	useEffect(() => {
		try {
			const clientId = googleAuthConfig.clientId;
			console.log('GSI clientId=', clientId);

			if ((window as any).google && clientId) {
				(window as any).google.accounts.id.initialize({
					client_id: clientId,
					callback: async (resp: any) => {
						const token = resp?.credential;
						if (!token) return;

						try {
							const backend = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:8080';
							const r = await fetch(`${backend}/api/auth/google`, {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ idToken: token })
							});

							if (!r.ok) {
								console.error('Backend token validation failed', r.status, await r.text());
								return;
							}

							authUtils.setToken(token);
							window.location.href = '/dashboard';
						} catch (err) {
							console.error('Failed to post idToken to backend', err);
						}
					}
				});

				// Try to render the official GSI button into our container
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
					console.warn('GSI renderButton failed', e);
					setGsiReady(false);
				}
			}
		} catch (e) {
			console.warn('GSI initialization error', e);
		}
	}, []);

	return (
		<div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
			<div className="relative z-10 w-full max-w-lg">
				<div className="glass-card p-8">
					<div className="text-center mb-6">
						<h1 className="text-2xl font-bold text-white">ISD-IA Organization</h1>
						<p className="text-sm text-gray-400">Sign in to continue</p>
					</div>

					<div>
						<div ref={gsiButtonRef} aria-hidden={false} />

						{/* Fallback visible button if GSI didn't render or isn't ready */}
						{!gsiReady && (
							<div className="mt-4">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

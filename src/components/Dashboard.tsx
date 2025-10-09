import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🛡️ Fargo Security Dashboard
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#94a3b8'
          }}>
            Monitoreo en tiempo real del sistema de ciberseguridad
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Card 1: Usuarios Activos */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '1rem',
                background: 'rgba(59, 130, 246, 0.2)',
                fontSize: '1.5rem'
              }}>
                👥
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  Usuarios Activos
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  4 de 6 en línea
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Alex Chen', status: 'online' },
                { name: 'Sarah Wilson', status: 'online' },
                { name: 'Mike Johnson', status: 'away' },
                { name: 'Emma Davis', status: 'online' }
              ].map((user, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: user.status === 'online' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: user.status === 'online' ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent'
                }}>
                  <div style={{
                    position: 'relative',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.125rem'
                  }}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '1rem',
                      height: '1rem',
                      borderRadius: '50%',
                      border: '2px solid #0f172a',
                      background: user.status === 'online' ? '#10b981' : '#f59e0b'
                    }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      {user.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {user.status === 'online' ? 'En línea' : 'Ausente'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Actividad de Red */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '1rem',
                background: 'rgba(6, 182, 212, 0.2)',
                fontSize: '1.5rem'
              }}>
                📈
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  Actividad de Red
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Tráfico en tiempo real
                </p>
              </div>
            </div>
            
            <div style={{
              height: '200px',
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'rgba(6, 182, 212, 0.2)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                📊
              </div>
              <p style={{ color: '#94a3b8', fontWeight: '600' }}>
                Gráfica Interactiva de Red
              </p>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                (Recharts se integrará aquí)
              </p>
            </div>
          </div>

          {/* Card 3: Alertas de Seguridad */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '1rem',
                background: 'rgba(239, 68, 68, 0.2)',
                fontSize: '1.5rem'
              }}>
                🚨
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  Alertas de Seguridad
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  3 activas • 1 crítica
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Amenaza Crítica', desc: 'Actividad sospechosa detectada', severity: 'critical' },
                { title: 'CPU Elevado', desc: 'Servidor excediendo 85%', severity: 'medium' },
                { title: 'Backup Exitoso', desc: 'Proceso completado', severity: 'low' }
              ].map((alert, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderLeft: `4px solid ${
                    alert.severity === 'critical' ? '#ef4444' : 
                    alert.severity === 'medium' ? '#f59e0b' : '#10b981'
                  }`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      {alert.title}
                    </h4>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' : 
                                  alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: alert.severity === 'critical' ? '#ef4444' : 
                             alert.severity === 'medium' ? '#f59e0b' : '#10b981',
                      border: `1px solid ${alert.severity === 'critical' ? '#ef4444' : 
                                           alert.severity === 'medium' ? '#f59e0b' : '#10b981'}30`
                    }}>
                      {alert.severity === 'critical' ? 'CRÍTICO' : 
                       alert.severity === 'medium' ? 'MEDIO' : 'BAJO'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {alert.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Estado del Sistema */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            textAlign: 'center' as const
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '1rem',
                background: 'rgba(16, 185, 129, 0.2)',
                fontSize: '1.5rem'
              }}>
                ⚡
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  Actividad Actual
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Sistema Operativo
                </p>
              </div>
            </div>
            
            <div style={{
              width: '8rem',
              height: '8rem',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #10b981, #06b6d4)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>99%</span>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Activo</span>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>156.2K</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Eventos/h</p>
              </div>
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>99.9%</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Uptime</p>
              </div>
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>2.1ms</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Latencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
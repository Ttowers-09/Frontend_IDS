import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  FileText, 
  Settings,
  Bell,
  Search,
  Activity,
  TrendingUp,
  TrendingDown,
  Zap,
  Eye,
  Lock,
  Database,
  Video,
  ArrowLeft
} from 'lucide-react';
import UsersPage from './UsersPage';
import AnalyticsPage from './AnalyticsPage';

interface DashboardProps {
  onLeaveCall: () => void;
  onBackToCall: () => void;
  callId: string;
  currentUser?: {
    id: string;
    name: string;
    isHost: boolean;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ onLeaveCall, onBackToCall, callId, currentUser }) => {
  // Si no es host, ir directamente a Analytics
  const [activeSection, setActiveSection] = useState(
    currentUser?.isHost ? 'dashboard' : 'analytics'
  );

  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calls', label: 'Llamadas', icon: Video },
    { id: 'alerts', label: 'Alertas', icon: AlertTriangle },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  // Filtrar nav items según el rol del usuario
  const navItems = currentUser?.isHost 
    ? allNavItems 
    : allNavItems.filter(item => item.id === 'analytics');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'logs':
        return <LogsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'dashboard':
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Grid Layout: Sidebar + Main Content */}
      <div className="grid grid-cols-[256px_1fr] h-screen">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          className="glass-card rounded-none border-r border-gray-700 flex flex-col"
        >
          {/* Logo */}
          <div className="p-lg border-b border-gray-700">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">CyberShield</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-md space-y-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-sm px-md py-sm rounded-md transition-all duration-normal ${
                    activeSection === item.id
                      ? 'bg-primary/20 border border-primary/30 text-white'
                      : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex flex-col">
          {/* Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card rounded-none border-b border-gray-700 p-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-xs">
                  {navItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-400 text-sm">
                  {activeSection === 'dashboard' && 'Centro de control de seguridad'}
                  {activeSection === 'users' && 'Gestión de usuarios y permisos'}
                  {activeSection === 'analytics' && (
                    currentUser?.isHost 
                      ? 'Análisis y métricas de seguridad' 
                      : 'Vista colaborativa de análisis en tiempo real'
                  )}
                  {activeSection === 'alerts' && 'Alertas y notificaciones'}
                  {activeSection === 'logs' && 'Registros del sistema'}
                  {activeSection === 'settings' && 'Configuración del sistema'}
                </p>
              </div>
              
              <div className="flex items-center gap-md">
                {/* Indicador de llamada activa */}
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">En llamada: {callId.substring(0, 8)}...</span>
                  
                  {/* Botón para regresar a la llamada */}
                  <motion.button
                    onClick={onBackToCall}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-2 p-1 hover:bg-blue-500/20 rounded text-blue-400 hover:text-blue-300 transition-colors"
                    title="Regresar a la llamada"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                  
                  {/* Botón para salir de la llamada */}
                  <motion.button
                    onClick={onLeaveCall}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-1 p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-colors"
                    title="Salir de la llamada"
                  >
                    <Shield className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-sm top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="glass-input w-64 pl-10 pr-sm py-sm rounded-md focus-ring"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-sm glass-card hover:bg-gray-600/50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
                </motion.button>
              </div>
            </div>
          </motion.header>

          {/* Content Area */}
          <main className="flex-1 p-lg overflow-auto">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  const stats = [
    { label: 'Amenazas Detectadas', value: '23', change: '+12%', trend: 'up', icon: AlertTriangle },
    { label: 'Usuarios Activos', value: '1,247', change: '+5%', trend: 'up', icon: Users },
    { label: 'Eventos de Seguridad', value: '456', change: '-8%', trend: 'down', icon: Activity },
    { label: 'Uptime del Sistema', value: '99.9%', change: '+0.1%', trend: 'up', icon: Zap },
  ];

  const threats = [
    { type: 'Malware Detectado', severity: 'high', time: '2 min ago', source: '192.168.1.45' },
    { type: 'Intento de Intrusión', severity: 'medium', time: '15 min ago', source: '10.0.0.23' },
    { type: 'Acceso No Autorizado', severity: 'high', time: '32 min ago', source: '172.16.0.12' },
    { type: 'Tráfico Sospechoso', severity: 'low', time: '1 hour ago', source: '203.0.113.5' },
  ];

  const systemServices = [
    { service: 'Firewall', status: 'Activo', health: 'healthy' },
    { service: 'Antivirus', status: 'Activo', health: 'healthy' },
    { service: 'IDS/IPS', status: 'Activo', health: 'healthy' },
    { service: 'VPN', status: 'Mantenimiento', health: 'warning' },
    { service: 'Backup', status: 'Activo', health: 'healthy' },
  ];

  const quickActions = [
    { label: 'Escaneo Completo', icon: Eye, color: 'bg-primary' },
    { label: 'Bloquear IP', icon: Lock, color: 'bg-error' },
    { label: 'Backup Manual', icon: Database, color: 'bg-success' },
    { label: 'Generar Reporte', icon: FileText, color: 'bg-accent' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-lg"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-md space-y-sm hover:bg-gray-700/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="p-sm bg-primary/20 rounded-md">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className={`flex items-center gap-xs text-sm ${
                  stat.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Recent Threats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-md space-y-md"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-sm">
            <AlertTriangle className="w-5 h-5 text-error" />
            Amenazas Recientes
          </h3>
          <div className="space-y-sm">
            {threats.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-sm bg-gray-800/50 rounded-md border border-gray-700"
              >
                <div className="flex items-center gap-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    threat.severity === 'high' ? 'bg-error' :
                    threat.severity === 'medium' ? 'bg-warning' : 'bg-success'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium text-sm">{threat.type}</div>
                    <div className="text-gray-400 text-xs">{threat.source}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">{threat.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-md space-y-md"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-sm">
            <Activity className="w-5 h-5 text-success" />
            Estado del Sistema
          </h3>
          <div className="space-y-sm">
            {systemServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-sm bg-gray-800/50 rounded-md border border-gray-700"
              >
                <div className="flex items-center gap-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    service.health === 'healthy' ? 'bg-success' : 
                    service.health === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <div className="text-white font-medium text-sm">{service.service}</div>
                </div>
                <div className={`text-sm font-medium ${
                  service.health === 'healthy' ? 'text-success' : 
                  service.health === 'warning' ? 'text-warning' : 'text-error'
                }`}>
                  {service.status}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-md space-y-md"
      >
        <h3 className="text-xl font-bold text-white flex items-center gap-sm">
          <Zap className="w-5 h-5 text-accent" />
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col items-center gap-xs p-md ${action.color} rounded-md text-white font-medium transition-all hover:opacity-90`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm text-center">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Placeholder components for other sections
const AlertsPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-lg space-y-md"
  >
    <h2 className="text-2xl font-bold text-white">Alertas de Seguridad</h2>
    <p className="text-gray-400">Gestión de alertas y notificaciones del sistema.</p>
  </motion.div>
);

const LogsPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-lg space-y-md"
  >
    <h2 className="text-2xl font-bold text-white">Registros del Sistema</h2>
    <p className="text-gray-400">Visualización y análisis de logs del sistema.</p>
  </motion.div>
);

const SettingsPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-lg space-y-md"
  >
    <h2 className="text-2xl font-bold text-white">Configuración</h2>
    <p className="text-gray-400">Configuración general del sistema de seguridad.</p>
  </motion.div>
);

export default Dashboard;
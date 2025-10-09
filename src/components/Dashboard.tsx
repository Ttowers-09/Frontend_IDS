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
  Database
} from 'lucide-react';
import UsersPage from './UsersPage';
import AnalyticsPage from './AnalyticsPage';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alertas', icon: AlertTriangle },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 min-h-screen bg-black/20 backdrop-blur-xl border-r border-purple-500/20"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">CyberShield</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/50'
                        : 'hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className={`w-5 h-5 ${activeSection === item.id ? 'text-purple-300' : 'text-gray-400'}`} />
                    <span className={`font-medium ${activeSection === item.id ? 'text-white' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/20 backdrop-blur-xl border-b border-purple-500/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {navItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-400">
                  {activeSection === 'dashboard' && 'Centro de control de seguridad'}
                  {activeSection === 'users' && 'Gestión de usuarios y permisos'}
                  {activeSection === 'analytics' && 'Análisis y métricas de seguridad'}
                  {activeSection === 'alerts' && 'Alertas y notificaciones'}
                  {activeSection === 'logs' && 'Registros del sistema'}
                  {activeSection === 'settings' && 'Configuración del sistema'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-64 pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="p-6">
            {renderMainContent()}
          </div>
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-300" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
            Amenazas Recientes
          </h3>
          <div className="space-y-4">
            {threats.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    threat.severity === 'high' ? 'bg-red-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium">{threat.type}</div>
                    <div className="text-gray-400 text-sm">{threat.source}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">{threat.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 text-green-400 mr-3" />
            Estado del Sistema
          </h3>
          <div className="space-y-4">
            {[
              { service: 'Firewall', status: 'Activo', health: 'healthy' },
              { service: 'Antivirus', status: 'Activo', health: 'healthy' },
              { service: 'IDS/IPS', status: 'Activo', health: 'healthy' },
              { service: 'VPN', status: 'Mantenimiento', health: 'warning' },
              { service: 'Backup', status: 'Activo', health: 'healthy' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.health === 'healthy' ? 'bg-green-500' : 
                    service.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium">{service.service}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  service.health === 'healthy' ? 'text-green-400' : 
                  service.health === 'warning' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {service.status}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Zap className="w-6 h-6 text-cyan-400 mr-3" />
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Escaneo Completo', icon: Eye, color: 'from-purple-500 to-purple-600' },
            { label: 'Bloquear IP', icon: Lock, color: 'from-red-500 to-red-600' },
            { label: 'Backup Manual', icon: Database, color: 'from-green-500 to-green-600' },
            { label: 'Generar Reporte', icon: FileText, color: 'from-blue-500 to-blue-600' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-4 bg-gradient-to-r ${action.color} rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-sm">{action.label}</span>
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
    className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6"
  >
    <h2 className="text-2xl font-bold text-white mb-4">Alertas de Seguridad</h2>
    <p className="text-gray-400">Gestión de alertas y notificaciones del sistema.</p>
  </motion.div>
);

const LogsPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6"
  >
    <h2 className="text-2xl font-bold text-white mb-4">Registros del Sistema</h2>
    <p className="text-gray-400">Visualización y análisis de logs del sistema.</p>
  </motion.div>
);

const SettingsPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6"
  >
    <h2 className="text-2xl font-bold text-white mb-4">Configuración</h2>
    <p className="text-gray-400">Configuración general del sistema de seguridad.</p>
  </motion.div>
);

export default Dashboard;
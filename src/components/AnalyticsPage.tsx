import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Shield, 
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Users,
  Globe,
  Zap,
  Clock,
  PieChart,
  LineChart,
  Lock,
  Unlock
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useCollaboration } from '../contexts/CollaborationContext';
import CollaborativeCursors from './CollaborativeCursors';
import UserPresenceIndicator from './UserPresenceIndicator';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('security');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Colaboración en tiempo real
  const { updateCursor, updateUserSection, canInteract, updateAnalytics } = useCollaboration();

  // Actualizar sección actual cuando se monta el componente
  useEffect(() => {
    updateUserSection('analytics');
    
    return () => {
      // Limpiar al desmontar
      updateUserSection('');
    };
  }, [updateUserSection]);

  // Manejar movimiento del mouse para sincronizar cursores
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY, 'analytics');
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [updateCursor]);

  // Función para manejar cambios (solo host puede ejecutar)
  const handleTimeRangeChange = (newRange: string) => {
    if (!canInteract) return;
    
    setTimeRange(newRange);
    updateAnalytics({ timeRange: newRange, selectedMetric });
  };

  const handleMetricChange = (newMetric: string) => {
    if (!canInteract) return;
    
    setSelectedMetric(newMetric);
    updateAnalytics({ timeRange, selectedMetric: newMetric });
  };

  const metrics = [
    {
      title: 'Security Events',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Shield,
      color: 'bg-primary'
    },
    {
      title: 'Threats Blocked',
      value: '156',
      change: '-8.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-error'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+5.8%',
      trend: 'up',
      icon: Users,
      color: 'bg-success'
    },
    {
      title: 'Network Traffic',
      value: '1.2TB',
      change: '+24.1%',
      trend: 'up',
      icon: Activity,
      color: 'bg-accent'
    },
    {
      title: 'Response Time',
      value: '1.8s',
      change: '-15.3%',
      trend: 'down',
      icon: Zap,
      color: 'bg-warning'
    },
    {
      title: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Clock,
      color: 'bg-success'
    }
  ];

  // Sample data for charts
  const securityEventData = [
    { time: '00:00', events: 45, threats: 2 },
    { time: '04:00', events: 38, threats: 1 },
    { time: '08:00', events: 125, threats: 8 },
    { time: '12:00', events: 195, threats: 12 },
    { time: '16:00', events: 158, threats: 6 },
    { time: '20:00', events: 89, threats: 4 },
  ];

  const threatTypeData = [
    { name: 'Malware', value: 35, color: '#ef4444' },
    { name: 'Phishing', value: 28, color: '#f97316' },
    { name: 'DDoS', value: 20, color: '#eab308' },
    { name: 'Intrusion', value: 12, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#6366f1' }
  ];

  const networkTrafficData = [
    { time: '00:00', inbound: 2.1, outbound: 1.8 },
    { time: '04:00', inbound: 1.5, outbound: 1.2 },
    { time: '08:00', inbound: 4.2, outbound: 3.8 },
    { time: '12:00', inbound: 5.8, outbound: 5.2 },
    { time: '16:00', inbound: 4.9, outbound: 4.5 },
    { time: '20:00', inbound: 3.2, outbound: 2.9 },
  ];

  const handleRefreshCollaborative = async () => {
    if (!canInteract) return;
    
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    updateAnalytics({ action: 'refresh', timeRange, selectedMetric });
  };

  return (
    <div className="relative">
      {/* Componentes colaborativos */}
      <CollaborativeCursors currentSection="analytics" />
      <UserPresenceIndicator currentSection="analytics" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-lg"
      >
        {/* Header with Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-md"
        >
        <div className="flex flex-col md:flex-row items-center justify-between gap-md">
          <div>
            <h1 className="text-2xl font-bold text-white mb-xs">Security Analytics</h1>
            <p className="text-gray-400">Real-time insights and security metrics</p>
          </div>
          
          <div className="flex items-center gap-sm">
            <div className={`flex items-center gap-xs glass-input px-sm py-xs rounded-md ${!canInteract ? 'opacity-60' : ''}`}>
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                disabled={!canInteract}
                className={`bg-transparent text-white border-none outline-none ${canInteract ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <option value="1h" className="bg-gray-800">Last Hour</option>
                <option value="24h" className="bg-gray-800">Last 24 Hours</option>
                <option value="7d" className="bg-gray-800">Last 7 Days</option>
                <option value="30d" className="bg-gray-800">Last 30 Days</option>
              </select>
              {!canInteract && (
                <div title="Solo host puede cambiar">
                  <Lock className="w-3 h-3 text-orange-400 ml-1" />
                </div>
              )}
            </div>
            
            <motion.button
              whileHover={canInteract ? { scale: 1.02 } : {}}
              whileTap={canInteract ? { scale: 0.98 } : {}}
              onClick={handleRefreshCollaborative}
              disabled={!canInteract || isRefreshing}
              className={`btn-primary px-sm py-xs rounded-md flex items-center gap-xs ${
                !canInteract ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary px-sm py-xs rounded-md flex items-center gap-xs"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-md cursor-pointer space-y-sm"
              onClick={() => setSelectedMetric(metric.title.toLowerCase().replace(' ', ''))}
            >
              <div className="flex items-center justify-between">
                <div className={`p-sm rounded-md ${metric.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-xs text-sm font-medium ${
                  metric.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.title}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        {/* Security Events Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-md"
        >
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-xl font-bold text-white flex items-center gap-xs">
              <LineChart className="w-5 h-5 text-primary" />
              Security Events Over Time
            </h3>
            <div className="flex items-center gap-sm">
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs text-gray-400">Events</span>
              </div>
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-xs text-gray-400">Threats</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={securityEventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(16px)'
                }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="threats"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Threat Types Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-md"
        >
          <h3 className="text-xl font-bold text-white mb-md flex items-center gap-xs">
            <PieChart className="w-5 h-5 text-accent" />
            Threat Distribution
          </h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={threatTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {threatTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(16px)'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          
          <div className="mt-sm space-y-xs">
            {threatTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-medium text-sm">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Network Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-md"
      >
        <h3 className="text-xl font-bold text-white mb-md flex items-center gap-xs">
          <BarChart3 className="w-5 h-5 text-success" />
          Network Traffic Analysis
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={networkTrafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                backdropFilter: 'blur(16px)'
              }}
            />
            <Bar dataKey="inbound" fill="#10B981" name="Inbound (GB)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outbound" fill="#3B82F6" name="Outbound (GB)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-md"
      >
        {[
          {
            title: 'Top Alert Source',
            value: '192.168.1.45',
            description: 'Most frequent alert origin',
            icon: Globe,
            color: 'bg-error'
          },
          {
            title: 'Peak Activity',
            value: '2:30 PM',
            description: 'Highest traffic period today',
            icon: Clock,
            color: 'bg-primary'
          },
          {
            title: 'Detection Rate',
            value: '97.3%',
            description: 'Threat detection accuracy',
            icon: Eye,
            color: 'bg-success'
          }
        ].map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-md space-y-sm"
            >
              <div className={`p-sm rounded-md ${insight.color} w-fit`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-medium text-white">{insight.title}</h4>
              <div className="text-2xl font-bold text-white">{insight.value}</div>
              <p className="text-gray-400 text-sm">{insight.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
    </div>
  );
};

export default AnalyticsPage;
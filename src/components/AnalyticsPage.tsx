import React, { useState } from 'react';
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
  LineChart
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('security');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const metrics = [
    {
      title: 'Security Events',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Threats Blocked',
      value: '156',
      change: '-8.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+5.8%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Network Traffic',
      value: '1.2TB',
      change: '+24.1%',
      trend: 'up',
      icon: Activity,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Response Time',
      value: '1.8s',
      change: '-15.3%',
      trend: 'down',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Clock,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-500/20'
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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gradient mb-2">Security Analytics</h1>
            <p className="text-gray-400">Real-time insights and security metrics</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass-input px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-white border-none outline-none cursor-pointer"
              >
                <option value="1h" className="bg-slate-800">Last Hour</option>
                <option value="24h" className="bg-slate-800">Last 24 Hours</option>
                <option value="7d" className="bg-slate-800">Last 7 Days</option>
                <option value="30d" className="bg-slate-800">Last 30 Days</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 hover-glow cursor-pointer"
              onClick={() => setSelectedMetric(metric.title.toLowerCase().replace(' ', ''))}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
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
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-400 text-sm font-medium">{metric.title}</div>
              </div>

              {/* Mini trend indicator */}
              <div className={`mt-4 h-2 rounded-full ${metric.bgColor} relative overflow-hidden`}>
                <motion.div
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r ${metric.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Events Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <LineChart className="w-6 h-6 text-blue-400" />
              Security Events Over Time
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Events</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
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
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-400" />
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
          
          <div className="mt-4 space-y-2">
            {threatTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-semibold text-sm">{item.value}%</span>
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
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-green-400" />
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'Top Alert Source',
            value: '192.168.1.45',
            description: 'Most frequent alert origin',
            icon: Globe,
            color: 'from-red-500 to-rose-500'
          },
          {
            title: 'Peak Activity',
            value: '2:30 PM',
            description: 'Highest traffic period today',
            icon: Clock,
            color: 'from-blue-500 to-cyan-500'
          },
          {
            title: 'Detection Rate',
            value: '97.3%',
            description: 'Threat detection accuracy',
            icon: Eye,
            color: 'from-green-500 to-emerald-500'
          }
        ].map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 hover-glow"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-r ${insight.color} w-fit mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">{insight.title}</h4>
              <div className="text-2xl font-bold text-gradient mb-2">{insight.value}</div>
              <p className="text-gray-400 text-sm">{insight.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsPage;
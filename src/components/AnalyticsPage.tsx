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
  RefreshCw
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const metrics = [
    {
      title: 'Security Events',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'Threats Blocked',
      value: '156',
      change: '-8.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Network Traffic',
      value: '1.2TB',
      change: '+24.1%',
      trend: 'up',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Response Time',
      value: '1.8s',
      change: '-15.3%',
      trend: 'down',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Security Analytics</h1>
          <p className="text-dark-600">Real-time insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2 bg-glass-200 rounded-xl p-1">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === range 
                    ? 'bg-primary-500 text-white shadow-glow-sm' 
                    : 'text-dark-600 hover:text-white hover:bg-glass-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Actions */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-glass-300 text-white px-4 py-2 rounded-xl font-medium hover:bg-glass-400 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-6 hover-lift group relative"
            >
              <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${metric.color}-500/20 relative`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-400 icon-glow`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
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
                <div className="text-sm text-dark-600">{metric.title}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Chart */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 hover-lift group"
      >
        <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Security Events Timeline</h3>
            <p className="text-dark-600">Real-time monitoring of security incidents</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-dark-600">Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-dark-600">Threats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-dark-600">Resolved</span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-80 relative">
          <div className="grid grid-cols-24 h-full items-end gap-1">
            {Array.from({ length: 24 }, (_, i) => {
              const height1 = Math.random() * 80 + 20;
              const height2 = Math.random() * 60 + 10;
              const height3 = Math.random() * 40 + 5;
              
              return (
                <div key={i} className="flex flex-col gap-1 items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height1}%` }}
                    transition={{ delay: i * 0.05 + 0.5, duration: 0.6 }}
                    className="w-full bg-gradient-to-t from-blue-600/60 to-blue-400/80 rounded-t-sm relative group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height2}%` }}
                    transition={{ delay: i * 0.05 + 0.7, duration: 0.6 }}
                    className="w-full bg-gradient-to-t from-red-600/60 to-red-400/80 rounded-sm"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height3}%` }}
                    transition={{ delay: i * 0.05 + 0.9, duration: 0.6 }}
                    className="w-full bg-gradient-to-t from-green-600/60 to-green-400/80 rounded-b-sm"
                  />
                </div>
              );
            })}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-dark-600 -ml-8">
            <span>1000</span>
            <span>750</span>
            <span>500</span>
            <span>250</span>
            <span>0</span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-dark-600 mt-4">
            {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'].map((time, i) => (
              <span key={i}>{time}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Row - Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Sources */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 hover-lift group"
        >
          <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h3 className="text-lg font-semibold text-white mb-6">Top Threat Sources</h3>
          
          <div className="space-y-4">
            {[
              { country: 'Russia', threats: 45, color: 'red' },
              { country: 'China', threats: 32, color: 'orange' },
              { country: 'North Korea', threats: 28, color: 'yellow' },
              { country: 'Iran', threats: 15, color: 'purple' },
              { country: 'Unknown', threats: 12, color: 'gray' }
            ].map((source, index) => (
              <div key={source.country} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${source.color}-500`}></div>
                  <span className="text-white">{source.country}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-glass-300 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(source.threats / 45) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className={`h-full bg-${source.color}-500 rounded-full`}
                    />
                  </div>
                  <span className="text-sm text-dark-600 w-8 text-right">{source.threats}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Performance */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 hover-lift group"
        >
          <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h3 className="text-lg font-semibold text-white mb-6">System Performance</h3>
          
          <div className="space-y-6">
            {[
              { label: 'CPU Usage', value: 67, color: 'blue' },
              { label: 'Memory Usage', value: 45, color: 'green' },
              { label: 'Disk I/O', value: 23, color: 'yellow' },
              { label: 'Network Load', value: 89, color: 'purple' }
            ].map((metric, index) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{metric.label}</span>
                  <span className="text-sm text-dark-600">{metric.value}%</span>
                </div>
                <div className="w-full h-2 bg-glass-300 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r from-${metric.color}-600 to-${metric.color}-400 rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
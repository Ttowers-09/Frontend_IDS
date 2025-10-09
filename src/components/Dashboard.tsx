import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  BarChart3, 
  Bell, 
  Users, 
  Play,
  MoreHorizontal,
  Plus,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

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
    <div className="min-h-screen bg-dark-50 text-dark-800 relative overflow-hidden font-inter">
      {/* Background Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-50"></div>
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Premium Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-0 top-0 h-full w-20 glass-sidebar z-50 flex flex-col items-center py-6"
      >
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mb-8 relative"
        >
          <Shield className="w-6 h-6 text-white icon-glow" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 blur-lg opacity-50 -z-10"></div>
        </motion.div>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-4 mb-auto">
          {[
            { icon: Activity, id: 'dashboard', active: true },
            { icon: Users, id: 'users' },
            { icon: BarChart3, id: 'analytics' },
            { icon: Bell, id: 'alerts' },
            { icon: Clock, id: 'logs' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${
                activeSection === item.id 
                  ? 'bg-primary-500/20 border border-primary-500/40 shadow-glow' 
                  : 'hover:bg-glass-200 border border-transparent hover:border-primary-500/20'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                activeSection === item.id ? 'text-primary-400 icon-glow' : 'text-dark-600 group-hover:text-primary-400'
              }`} />
              {activeSection === item.id && (
                <div className="absolute right-0 w-1 h-8 bg-gradient-to-b from-primary-500 to-purple-600 rounded-full"></div>
              )}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="ml-20 min-h-screen">
        {/* Top Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 backdrop-blur-2xl bg-dark-50/40 border-b border-glass-300 z-40 px-8 py-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient mb-1">Fargo</h1>
              <p className="text-sm text-dark-600">Security Dashboard</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* User Avatars */}
              <div className="flex items-center -space-x-2">
                {[
                  { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
                  { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b172?w=40&h=40&fit=crop&crop=face' },
                  { name: 'Mike', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' }
                ].map((user, index) => (
                  <motion.div
                    key={user.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="relative"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-dark-100 hover:border-primary-500 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-dark-50 status-ring"></div>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white transition-colors duration-300 shadow-glow-sm"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="p-8 grid grid-cols-12 gap-6"
        >
          {/* Smart Shield Card */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-4 glass-card rounded-4xl p-6 relative hover-lift group"
          >
            <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary-500/20 relative">
                  <Shield className="w-6 h-6 text-primary-400 icon-glow" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">Smart Shield</h3>
                  <p className="text-sm text-blue-300/70 tracking-wide">Real-time Protection</p>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-dark-600 hover:text-white/70 cursor-pointer" />
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="rgba(30, 58, 138, 0.3)"
                    strokeWidth="8"
                  />
                  {/* Level 1 */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeDasharray="125.6"
                    strokeDashoffset="31.4"
                    className="animate-pulse-glow"
                  />
                  {/* Level 2 */}
                  <circle
                    cx="50" cy="50" r="28"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="6"
                    strokeDasharray="87.9"
                    strokeDashoffset="21.975"
                  />
                  {/* Level 3 */}
                  <circle
                    cx="50" cy="50" r="18"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="4"
                    strokeDasharray="56.5"
                    strokeDashoffset="14.125"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99%</div>
                    <div className="text-xs text-dark-600">Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <span className="text-dark-600">Level 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                <span className="text-dark-600">Level 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-dark-600">Level 3</span>
              </div>
            </div>
          </motion.div>

          {/* AI Defender Card */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-4 glass-card rounded-4xl p-6 relative hover-lift group"
          >
            <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/20 relative">
                  <Activity className="w-6 h-6 text-cyan-400 icon-glow" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">AI Defender</h3>
                  <p className="text-sm text-blue-300/70 tracking-wide">Neural Network</p>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-dark-600 hover:text-white/70 cursor-pointer" />
            </div>

            {/* Status Indicators */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm text-dark-600">Restless</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-dark-600">Awake</span>
              </div>
            </div>

            {/* Chart Area with Play Button */}
            <div className="relative h-32 bg-dark-100/30 rounded-2xl flex items-center justify-center border border-glass-300">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100">
                <path
                  d="M 10,80 Q 50,20 90,50 T 170,30"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-glass-300 backdrop-blur-xl border border-glass-400 flex items-center justify-center group hover:bg-primary-500/20 transition-all duration-300"
              >
                <Play className="w-8 h-8 text-white/70 group-hover:text-primary-400 ml-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Timor-Leste Large Card */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-4 glass-card rounded-4xl p-6 relative hover-lift group"
          >
            <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white/90">Timor-Leste</h3>
              <div className="text-right">
                <div className="text-xl font-bold text-white">43,361</div>
                <div className="text-sm text-dark-600">Total Events</div>
              </div>
            </div>

            <p className="text-sm text-dark-600 mb-6 leading-relaxed">
              Every large design company whether it's a multi-national branding corporation or a regular.
            </p>

            {/* Progress Bar */}
            <div className="relative h-2 bg-dark-200/30 rounded-full mb-4">
              <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full"></div>
            </div>

            {/* Users */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  className="w-8 h-8 rounded-full border-2 border-dark-100"
                  alt="User"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
              <div className="ml-auto text-right">
                <div className="text-lg font-bold text-white">100%</div>
                <div className="text-xs text-dark-600">Complete</div>
              </div>
            </div>
          </motion.div>

          {/* Network Integration Chart */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-8 glass-card rounded-4xl p-6 relative hover-lift group"
          >
            <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="text-sm text-dark-600">Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span className="text-sm text-dark-600">Bandwidth</span>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-48 relative">
              <div className="grid grid-cols-12 h-full items-end gap-2">
                {[20, 35, 25, 40, 30, 45, 25, 35, 20, 40, 35, 25].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1 + 1, duration: 0.6 }}
                    className="bg-gradient-to-t from-primary-600/60 to-primary-400/80 rounded-t-lg relative group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary-400 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>
              
              {/* Metrics */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-dark-600 -ml-8">
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-4 glass-card rounded-4xl p-6 relative hover-lift group"
          >
            <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white/90">Status</h3>
              <MoreHorizontal className="w-5 h-5 text-dark-600 hover:text-white/70 cursor-pointer" />
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-dark-600">Restless</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-dark-600">Awake</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-dark-600">Deep</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-dark-600">Time</span>
              </div>
            </div>

            {/* Multi-line Chart */}
            <div className="h-24 relative">
              <svg className="w-full h-full" viewBox="0 0 300 80">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <line
                    key={i}
                    x1={i * 42.5}
                    y1="0"
                    x2={i * 42.5}
                    y2="80"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Status lines */}
                <path
                  d="M 0,60 Q 50,20 100,40 T 200,30 T 300,50"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  className="opacity-80"
                />
                <path
                  d="M 0,40 Q 50,60 100,20 T 200,50 T 300,30"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  className="opacity-80"
                />
                <path
                  d="M 0,30 Q 50,10 100,25 T 200,15 T 300,40"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                  className="opacity-80"
                />
                <path
                  d="M 0,50 Q 50,30 100,45 T 200,35 T 300,25"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="opacity-80"
                />
              </svg>
            </div>

            {/* Time Labels */}
            <div className="flex justify-between text-xs text-dark-600 mt-2">
              {['01', '02', '03', '04', '05', '06', '07'].map(time => (
                <span key={time}>{time}</span>
              ))}
            </div>
          </motion.div>

          {/* Bobby Jacobs Profile Card */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-4 glass-card rounded-4xl p-6 relative hover-lift group text-center"
          >
            <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                  className="w-20 h-20 rounded-full border-4 border-glass-300"
                  alt="Bobby Jacobs"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon-green rounded-full border-2 border-dark-50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-dark-600 mb-2">Bobby Jacobs</div>
              <div className="text-4xl font-bold text-neon-green mb-1">99%</div>
              <div className="text-sm text-neon-green">+45%</div>
            </div>

            {/* Mini Chart */}
            <div className="h-12 relative">
              <svg className="w-full h-full" viewBox="0 0 120 40">
                <path
                  d="M 0,30 Q 20,10 40,20 T 80,15 T 120,25"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                  className="opacity-80"
                />
                <path
                  d="M 0,35 L 120,30"
                  fill="url(#gradient)"
                  stroke="#22C55E"
                  strokeWidth="1"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
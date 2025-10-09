import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  Crown, 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Alex Chen',
      email: 'alex.chen@fargo.com',
      role: 'Admin',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      lastActive: '2 min ago',
      department: 'Security',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@fargo.com',
      role: 'Security Analyst',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b172?w=80&h=80&fit=crop&crop=face',
      lastActive: '5 min ago',
      department: 'Security',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@fargo.com',
      role: 'Network Admin',
      status: 'away',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      lastActive: '1 hour ago',
      department: 'IT Operations',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@fargo.com',
      role: 'SOC Manager',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      lastActive: 'Just now',
      department: 'Security',
      phone: '+1 (555) 321-0987',
      location: 'Chicago, IL'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      email: 'david.rodriguez@fargo.com',
      role: 'Compliance Officer',
      status: 'offline',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
      lastActive: '2 days ago',
      department: 'Compliance',
      phone: '+1 (555) 654-3210',
      location: 'Miami, FL'
    }
  ];

  const getRoleIcon = (role: string) => {
    if (role === 'Admin') return Crown;
    if (role === 'SOC Manager') return Shield;
    return User;
  };

  const getRoleColor = (role: string) => {
    if (role === 'Admin') return 'text-yellow-400';
    if (role === 'SOC Manager') return 'text-purple-400';
    return 'text-blue-400';
  };

  const getStatusColor = (status: string) => {
    if (status === 'online') return 'bg-green-500';
    if (status === 'away') return 'bg-yellow-500';
    return 'bg-gray-500';
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">User Management</h1>
          <p className="text-dark-600">Manage team members and their permissions</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
          <UserPlus className="w-5 h-5" />
          Add User
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-3 rounded-xl border border-glass-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-white placeholder-dark-600"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-600 w-5 h-5" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="glass-input pl-10 pr-8 py-3 rounded-xl border border-glass-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-white bg-dark-100"
            >
              <option value="all">All Users</option>
              <option value="online">Online Only</option>
              <option value="admin">Admins</option>
              <option value="security">Security Team</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Users Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {users.map((user) => {
          const RoleIcon = getRoleIcon(user.role);
          return (
            <motion.div
              key={user.id}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-6 hover-lift group relative"
            >
              <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-glass-300"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-dark-50`}></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <div className="flex items-center gap-2">
                      <RoleIcon className={`w-4 h-4 ${getRoleColor(user.role)}`} />
                      <span className={`text-sm ${getRoleColor(user.role)}`}>{user.role}</span>
                    </div>
                  </div>
                </div>
                
                <button className="text-dark-600 hover:text-white transition-colors duration-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <Activity className="w-4 h-4" />
                  <span>Last active: {user.lastActive}</span>
                </div>
              </div>

              {/* Department Badge */}
              <div className="mt-4 pt-4 border-t border-glass-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  {user.department}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Stats Card */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Team Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">3</div>
            <div className="text-sm text-dark-600">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">1</div>
            <div className="text-sm text-dark-600">Away</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400 mb-1">1</div>
            <div className="text-sm text-dark-600">Offline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">5</div>
            <div className="text-sm text-dark-600">Total</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UsersPage;
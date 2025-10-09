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
  Activity,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock
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
      role: 'IT Specialist',
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         user.role.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '1,247', icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Active Now', value: '892', icon: Activity, color: 'from-green-500 to-emerald-500' },
          { label: 'Admins', value: '23', icon: Crown, color: 'from-purple-500 to-violet-500' },
          { label: 'New Today', value: '12', icon: UserPlus, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-12 pr-4 py-3 rounded-xl border border-glass-300 focus:border-primary-500 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="glass-input pl-12 pr-8 py-3 rounded-xl border border-glass-300 text-white bg-transparent appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-800">All Users</option>
                <option value="admin" className="bg-slate-800">Admins</option>
                <option value="analyst" className="bg-slate-800">Analysts</option>
                <option value="specialist" className="bg-slate-800">Specialists</option>
                <option value="manager" className="bg-slate-800">Managers</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-black/20 border-b border-gray-700">
              <tr>
                <th className="text-left p-6 text-gray-300 font-semibold">User</th>
                <th className="text-left p-6 text-gray-300 font-semibold">Role</th>
                <th className="text-left p-6 text-gray-300 font-semibold">Department</th>
                <th className="text-left p-6 text-gray-300 font-semibold">Status</th>
                <th className="text-left p-6 text-gray-300 font-semibold">Last Active</th>
                <th className="text-left p-6 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-b border-gray-700/30 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-primary-500 transition-all"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                          user.status === 'online' ? 'bg-green-500' : 
                          user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-primary-300 transition-colors">{user.name}</div>
                        <div className="text-gray-400 text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      {user.role === 'Admin' ? (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      ) : user.role.includes('Manager') ? (
                        <Shield className="w-4 h-4 text-purple-500" />
                      ) : user.role.includes('Analyst') ? (
                        <Shield className="w-4 h-4 text-blue-500" />
                      ) : (
                        <User className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-white font-medium">{user.role}</span>
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <span className="text-gray-300">{user.department}</span>
                  </td>
                  
                  <td className="p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'online' ? 'bg-green-500/20 text-green-400' :
                      user.status === 'away' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status === 'online' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : user.status === 'away' ? (
                        <Clock className="w-3 h-3 mr-1" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-500 mr-1" />
                      )}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  
                  <td className="p-6">
                    <span className="text-gray-400">{user.lastActive}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="More Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { title: 'Bulk Actions', description: 'Manage multiple users at once', icon: Users, color: 'from-blue-500 to-cyan-500' },
          { title: 'User Permissions', description: 'Configure role-based access', icon: Shield, color: 'from-purple-500 to-violet-500' },
          { title: 'Activity Logs', description: 'View user activity history', icon: Activity, color: 'from-green-500 to-emerald-500' }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 cursor-pointer hover-glow"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} w-fit mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default UsersPage;
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
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         user.role.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'bg-primary' },
    { label: 'Active Now', value: '892', icon: Activity, color: 'bg-success' },
    { label: 'Admins', value: '23', icon: Crown, color: 'bg-warning' },
    { label: 'New Today', value: '12', icon: UserPlus, color: 'bg-accent' }
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-md space-y-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
                <div className={`p-sm rounded-md ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-md"
      >
        <div className="flex flex-col md:flex-row gap-md items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-sm top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10 pr-sm py-sm rounded-md focus-ring"
            />
          </div>
          
          <div className="flex gap-sm">
            <div className="relative">
              <Filter className="absolute left-sm top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="glass-input pl-10 pr-8 py-sm rounded-md focus-ring bg-transparent appearance-none cursor-pointer"
              >
                <option value="all" className="bg-gray-800">All Users</option>
                <option value="admin" className="bg-gray-800">Admins</option>
                <option value="analyst" className="bg-gray-800">Analysts</option>
                <option value="specialist" className="bg-gray-800">Specialists</option>
                <option value="manager" className="bg-gray-800">Managers</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-md py-sm rounded-md flex items-center gap-xs"
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="text-left p-md text-gray-300 font-medium">User</th>
                <th className="text-left p-md text-gray-300 font-medium">Role</th>
                <th className="text-left p-md text-gray-300 font-medium">Department</th>
                <th className="text-left p-md text-gray-300 font-medium">Status</th>
                <th className="text-left p-md text-gray-300 font-medium">Last Active</th>
                <th className="text-left p-md text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors group"
                >
                  <td className="p-md">
                    <div className="flex items-center gap-sm">
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-primary transition-colors"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                          user.status === 'online' ? 'bg-success' : 
                          user.status === 'away' ? 'bg-warning' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-primary transition-colors">{user.name}</div>
                        <div className="text-gray-400 text-sm flex items-center gap-xs">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-md">
                    <div className="flex items-center gap-xs">
                      {user.role === 'Admin' ? (
                        <Crown className="w-4 h-4 text-warning" />
                      ) : user.role.includes('Manager') ? (
                        <Shield className="w-4 h-4 text-primary" />
                      ) : user.role.includes('Analyst') ? (
                        <Shield className="w-4 h-4 text-accent" />
                      ) : (
                        <User className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-white font-medium">{user.role}</span>
                    </div>
                  </td>
                  
                  <td className="p-md">
                    <span className="text-gray-300">{user.department}</span>
                  </td>
                  
                  <td className="p-md">
                    <span className={`inline-flex items-center px-sm py-xs rounded-full text-xs font-medium ${
                      user.status === 'online' ? 'bg-success/20 text-success' :
                      user.status === 'away' ? 'bg-warning/20 text-warning' :
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
                  
                  <td className="p-md">
                    <span className="text-gray-400">{user.lastActive}</span>
                  </td>
                  
                  <td className="p-md">
                    <div className="flex items-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-xs rounded-md hover:bg-accent/20 text-accent hover:text-accent transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-xs rounded-md hover:bg-primary/20 text-primary hover:text-primary transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-xs rounded-md hover:bg-error/20 text-error hover:text-error transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-xs rounded-md hover:bg-gray-600/50 text-gray-400 hover:text-white transition-colors"
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
          <div className="text-center py-xl">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-md" />
            <h3 className="text-lg font-medium text-gray-400 mb-xs">No users found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UsersPage;
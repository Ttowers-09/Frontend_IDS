// ROLE-BASED RESTRICTIONS IMPLEMENTED
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  Users, 
  Calendar,
  Clock,
  Copy,
  Share2,
  Play,
  Shield,
  Monitor,
  Headphones,
  Camera,
  Volume2,
  Activity
} from 'lucide-react';
import CallRoom from './CallRoom';

interface CallsPageProps {
  onJoinCall: (callId: string) => void;
  onLeaveCall: () => void;
  isInCall: boolean;
  currentCallId: string;
  onNavigateToDashboard?: () => void;
  currentUser?: {
    id: string;
    name: string;
    isHost: boolean;
  };
}

const CallsPage: React.FC<CallsPageProps> = ({ 
  onJoinCall, 
  onLeaveCall, 
  isInCall, 
  currentCallId,
  onNavigateToDashboard,
  currentUser
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState('default');
  const [selectedMicrophone, setSelectedMicrophone] = useState('default');
  const [selectedSpeaker, setSelectedSpeaker] = useState('default');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    const link = `https://meet.fargo.com/room/${meetingId}`;
    setGeneratedLink(link);
  };

  const joinMeeting = (meetingId: string) => {
    onJoinCall(meetingId);
  };

  // Si estamos en una llamada, mostrar CallRoom
  if (isInCall && currentCallId) {
    return (
      <CallRoom 
        meetingId={currentCallId} 
        onLeaveCall={onLeaveCall}
        onNavigateToDashboard={onNavigateToDashboard}
        currentUser={currentUser}
      />
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías agregar una notificación de "Copiado"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-lg min-h-screen p-lg"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-lg"
      >
        <div className="flex items-center justify-between">
                    <div>
            <h1 className="text-2xl font-bold text-white mb-xs">Video Calls</h1>
            <p className="text-gray-400">
              {currentUser?.isHost 
                ? "Create and manage secure video meetings" 
                : "Join secure video meetings"}
            </p>
          </div>
          <div className="bg-primary p-sm rounded-md">
            <Video className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Live Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-lg space-y-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {currentUser?.isHost ? '12' : '3'}
            </div>
            <div className="text-xs text-gray-400">
              {currentUser?.isHost ? 'Active Meetings' : 'Available Meetings'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {currentUser?.isHost ? '48' : '5'}
            </div>
            <div className="text-xs text-gray-400">
              {currentUser?.isHost ? 'Total Users' : 'Joined Today'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {currentUser?.isHost ? '256' : '2.5h'}
            </div>
            <div className="text-xs text-gray-400">
              {currentUser?.isHost ? 'This Month' : 'Meeting Time'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">98%</div>
            <div className="text-xs text-gray-400">System Uptime</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {currentUser?.isHost ? (
          <>
            {/* Admin Section - Create Meetings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-lg"
            >
            {/* New Meeting Card */}
            <div className="glass-card p-lg space-y-md">
              <h2 className="text-xl font-bold text-white flex items-center gap-xs">
                <Play className="w-5 h-5 text-primary" />
                Create New Meeting
                <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full font-bold">ADMIN</span>
              </h2>
            
            <div className="space-y-sm">
              <div className="flex flex-col sm:flex-row gap-sm">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (!generatedLink) {
                      generateMeetingLink();
                    }
                    // Extraer el meeting ID del link generado
                    const meetingId = generatedLink.split('/room/')[1] || Math.random().toString(36).substring(2, 15);
                    joinMeeting(meetingId);
                  }}
                  className="btn-primary flex-1 py-sm rounded-md flex items-center justify-center gap-xs"
                >
                  <Video className="w-4 h-4" />
                  Create & Join Meeting
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary px-sm py-sm rounded-md flex items-center justify-center gap-xs sm:w-auto"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule
                </motion.button>
              </div>
            </div>

            {/* Generated Link */}
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-xs"
              >
                <label className="block text-sm font-medium text-gray-300">
                  Meeting Link
                </label>
                <div className="flex flex-col sm:flex-row gap-xs">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="glass-input flex-1 px-sm py-sm rounded-md text-gray-300 w-full sm:min-w-0"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyToClipboard(generatedLink)}
                    className="btn-secondary px-sm py-sm rounded-md flex items-center justify-center gap-xs sm:w-auto"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="sm:hidden">Copiar</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-accent px-sm py-sm rounded-md flex items-center justify-center gap-xs sm:w-auto"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="sm:hidden">Compartir</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-lg space-y-md">
            <h3 className="text-xl font-bold text-white">Quick Actions</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const meetingId = prompt('Enter Meeting ID:');
                  if (meetingId) joinMeeting(meetingId);
                }}
                className="flex flex-col items-center gap-xs p-lg bg-primary rounded-md text-white font-medium transition-all hover:opacity-90"
              >
                <Users className="w-5 h-5" />
                <span className="text-sm text-center">Join Meeting</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const instantMeetingId = Math.random().toString(36).substring(2, 15);
                  joinMeeting(instantMeetingId);
                }}
                className="flex flex-col items-center gap-xs p-lg bg-accent rounded-md text-white font-medium transition-all hover:opacity-90"
              >
                <Clock className="w-5 h-5" />
                <span className="text-sm text-center">Instant Meeting</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateMeetingLink}
                className="flex flex-col items-center gap-xs p-lg bg-success rounded-md text-white font-medium transition-all hover:opacity-90"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm text-center">Schedule</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center gap-xs p-lg bg-gray-600 rounded-md text-white font-medium transition-all hover:opacity-90"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm text-center">Settings</span>
              </motion.button>
            </div>
          </div>
            </motion.div>

            {/* Admin Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-lg"
            >
              <div className="glass-card p-lg space-y-md">
                <h3 className="text-xl font-bold text-white flex items-center gap-sm">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  Admin Control Panel
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-md space-y-sm hover:bg-gray-700/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-sm bg-primary/20 rounded-md">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex items-center gap-xs text-sm text-success">
                        <span>+12%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-gray-400 text-sm">Active Meetings</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-md space-y-sm hover:bg-gray-700/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-sm bg-accent/20 rounded-md">
                        <Users className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex items-center gap-xs text-sm text-success">
                        <span>+5%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">48</div>
                      <div className="text-gray-400 text-sm">Total Participants</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-md space-y-sm hover:bg-gray-700/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-sm bg-success/20 rounded-md">
                        <Activity className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex items-center gap-xs text-sm text-success">
                        <span>+0.1%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-gray-400 text-sm">System Uptime</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-md space-y-sm hover:bg-gray-700/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-sm bg-blue-500/20 rounded-md">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex items-center gap-xs text-sm text-success">
                        <span>+15%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">256</div>
                      <div className="text-gray-400 text-sm">Total Users</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="glass-card p-lg space-y-md">
                <h3 className="text-xl font-bold text-white">Quick Admin Actions</h3>
                <div className="space-y-sm">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full glass-input p-md rounded-md text-left hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-sm">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">Manage Users</span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full glass-input p-md rounded-md text-left hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-sm">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-white text-sm">System Settings</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          /* Join Only Section - Para Participantes */
          <>
            {/* Participant Section - Join Meetings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-lg"
            >
            {/* Join Meeting Card */}
            <div className="glass-card p-lg space-y-md">
              <h2 className="text-xl font-bold text-white flex items-center gap-xs">
                <Users className="w-5 h-5 text-blue-400" />
                Join Meeting
                <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-bold">PARTICIPANT</span>
              </h2>
              
              <p className="text-gray-400 text-sm">
                RESTRICTED: You can only join existing meetings created by administrators. You cannot create new meetings.
              </p>
              
              <div className="space-y-sm">
                <div className="flex flex-col sm:flex-row gap-sm">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const meetingId = prompt('Enter Meeting ID:');
                      if (meetingId) joinMeeting(meetingId);
                    }}
                    className="btn-primary flex-1 py-lg rounded-md flex items-center justify-center gap-xs text-lg font-medium"
                  >
                    <Video className="w-5 h-5" />
                    Join Meeting
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Quick Join */}
            <div className="glass-card p-lg space-y-md">
              <h3 className="text-xl font-bold text-white">Quick Join</h3>
              
              <div className="grid grid-cols-1 gap-sm">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const meetingId = prompt('Enter Meeting ID:');
                    if (meetingId) joinMeeting(meetingId);
                  }}
                  className="glass-input p-md rounded-md text-left space-y-xs hover:bg-white/10 transition-colors w-full"
                >
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-white font-medium text-sm">Join with ID</div>
                    <div className="text-gray-400 text-xs">Enter meeting ID to join</div>
                  </div>
                </motion.button>
              </div>
            </div>
            </motion.div>

            {/* Participant Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-lg"
            >
              <div className="glass-card p-lg space-y-md">
                <h3 className="text-xl font-bold text-white flex items-center gap-sm">
                  <Users className="w-5 h-5 text-blue-400" />
                  Participant Guide
                </h3>
                <div className="space-y-sm text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span>Get meeting ID from administrator</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span>Click "Join Meeting" button</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span>Enter ID when prompted to join</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-lg space-y-md">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <div className="space-y-sm">
                  <div className="glass-input p-md rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm font-medium">Team Meeting</div>
                        <div className="text-gray-400 text-xs">Joined 2 hours ago</div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="glass-input p-md rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm font-medium">Project Review</div>
                        <div className="text-gray-400 text-xs">Joined yesterday</div>
                      </div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-md"
        >
          {/* Camera & Audio Preview */}
          <div className="glass-card p-md space-y-md">
            <h3 className="text-lg font-medium text-white flex items-center gap-xs">
              <Settings className="w-5 h-5 text-primary" />
              Audio & Video Settings
            </h3>

            {/* Preview Area */}
            <div className="relative aspect-video bg-gray-800 rounded-md overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isVideoEnabled ? (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-500 mx-auto mb-sm" />
                    <p className="text-gray-400 text-sm">Camera Preview</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-12 h-12 text-gray-500 mx-auto mb-sm" />
                    <p className="text-gray-400 text-sm">Camera Off</p>
                  </div>
                )}
              </div>
              
              {/* Controls Overlay */}
              <div className="absolute bottom-sm left-sm right-sm">
                <div className="flex justify-center gap-sm">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className={`p-sm rounded-full ${
                      isVideoEnabled ? 'bg-white/20' : 'bg-error'
                    } backdrop-blur-sm`}
                  >
                    {isVideoEnabled ? (
                      <Video className="w-4 h-4 text-white" />
                    ) : (
                      <VideoOff className="w-4 h-4 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className={`p-sm rounded-full ${
                      isAudioEnabled ? 'bg-white/20' : 'bg-error'
                    } backdrop-blur-sm`}
                  >
                    {isAudioEnabled ? (
                      <Mic className="w-4 h-4 text-white" />
                    ) : (
                      <MicOff className="w-4 h-4 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Device Settings */}
          <div className="glass-card p-md space-y-md">
            <h3 className="text-lg font-medium text-white">Device Settings</h3>
            
            <div className="space-y-sm">
              {/* Camera Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-xs flex items-center gap-xs">
                  <Camera className="w-4 h-4" />
                  Camera
                </label>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="glass-input w-full px-sm py-sm rounded-md focus-ring bg-transparent"
                >
                  <option value="default" className="bg-gray-800">Default Camera</option>
                  <option value="front" className="bg-gray-800">Front Camera</option>
                  <option value="back" className="bg-gray-800">Back Camera</option>
                </select>
              </div>

              {/* Microphone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-xs flex items-center gap-xs">
                  <Mic className="w-4 h-4" />
                  Microphone
                </label>
                <select
                  value={selectedMicrophone}
                  onChange={(e) => setSelectedMicrophone(e.target.value)}
                  className="glass-input w-full px-sm py-sm rounded-md focus-ring bg-transparent"
                >
                  <option value="default" className="bg-gray-800">Default Microphone</option>
                  <option value="headset" className="bg-gray-800">Headset Microphone</option>
                  <option value="external" className="bg-gray-800">External Microphone</option>
                </select>
              </div>

              {/* Speaker Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-xs flex items-center gap-xs">
                  <Volume2 className="w-4 h-4" />
                  Speaker
                </label>
                <select
                  value={selectedSpeaker}
                  onChange={(e) => setSelectedSpeaker(e.target.value)}
                  className="glass-input w-full px-sm py-xs rounded-md focus-ring bg-transparent"
                >
                  <option value="default" className="bg-gray-800">Default Speaker</option>
                  <option value="headphones" className="bg-gray-800">Headphones</option>
                  <option value="external" className="bg-gray-800">External Speakers</option>
                </select>
              </div>
            </div>

            {/* Test Buttons */}
            <div className="flex gap-sm">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex-1 py-xs rounded-md flex items-center justify-center gap-xs text-sm"
              >
                <Headphones className="w-4 h-4" />
                Test Audio
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex-1 py-xs rounded-md flex items-center justify-center gap-xs text-sm"
              >
                <Monitor className="w-4 h-4" />
                Test Video
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Meetings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-md"
      >
        <h3 className="text-lg font-medium text-white mb-md">Recent Meetings</h3>
        
        <div className="space-y-sm">
          {[
            { name: 'Team Standup', time: '2 hours ago', participants: 8 },
            { name: 'Security Review', time: 'Yesterday', participants: 5 },
            { name: 'Project Planning', time: '2 days ago', participants: 12 }
          ].map((meeting, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-sm glass-input rounded-md hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-sm">
                <div className="bg-primary/20 p-xs rounded-md">
                  <Video className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{meeting.name}</div>
                  <div className="text-gray-400 text-xs">{meeting.time} • {meeting.participants} participants</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const meetingToJoin = meeting.name.toLowerCase().replace(' ', '-') + '-' + Math.random().toString(36).substring(2, 8);
                  joinMeeting(meetingToJoin);
                }}
                className="btn-secondary px-sm py-xs rounded-md text-xs"
              >
                Join Again
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CallsPage;
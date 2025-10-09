import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff,
  Monitor,
  MoreVertical,
  MessageSquare,
  Users,
  Settings,
  Maximize,
  Minimize,
  Hand,
  Smile,
  BarChart3
} from 'lucide-react';

interface CallRoomProps {
  meetingId?: string;
  onLeaveCall: () => void;
  onNavigateToDashboard?: () => void;
  currentUser?: {
    id: string;
    name: string;
    isHost: boolean;
  };
}

const CallRoom: React.FC<CallRoomProps> = ({ 
  meetingId = "room-123", 
  onLeaveCall,
  onNavigateToDashboard,
  currentUser = { id: 'default-user', name: 'Usuario', isHost: true }
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Simular participantes
  const [participants] = useState([
    { id: 1, name: 'Alex Chen', isVideoOn: true, isAudioOn: true, isHost: true },
    { id: 2, name: 'Sarah Wilson', isVideoOn: true, isAudioOn: false, isHost: false },
    { id: 3, name: 'Mike Johnson', isVideoOn: false, isAudioOn: true, isHost: false },
    { id: 4, name: 'Emma Davis', isVideoOn: true, isAudioOn: true, isHost: false },
  ]);

  // Timer de duración de la llamada
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-md glass-card rounded-none border-b border-gray-700"
      >
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="text-white font-medium">Meeting ID: {meetingId}</span>
          </div>
          <div className="text-gray-400 text-sm">
            Duration: {formatDuration(callDuration)}
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="p-xs rounded-md glass-input hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-gray-400" />
            ) : (
              <Maximize className="w-4 h-4 text-gray-400" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-xs rounded-md glass-input hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Video Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-md p-md">
        {/* Video Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-md">
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-video glass-card overflow-hidden group"
            >
              {/* Video Placeholder */}
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                {participant.isVideoOn ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-sm">
                      <span className="text-white text-xl font-bold">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-white text-sm">Video Active</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-12 h-12 text-gray-500 mx-auto mb-sm" />
                    <p className="text-gray-400 text-sm">Video Off</p>
                  </div>
                )}
              </div>

              {/* Participant Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-xs">
                    <span className="text-white text-sm font-medium">{participant.name}</span>
                    {participant.isHost && (
                      <span className="bg-primary px-xs py-xs rounded text-white text-xs">Host</span>
                    )}
                  </div>
                  <div className="flex items-center gap-xs">
                    {!participant.isAudioOn && (
                      <MicOff className="w-4 h-4 text-error" />
                    )}
                    {!participant.isVideoOn && (
                      <VideoOff className="w-4 h-4 text-warning" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-md">
          {/* Participants Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-md"
          >
            <div className="flex items-center justify-between mb-sm">
              <h3 className="text-white font-medium flex items-center gap-xs">
                <Users className="w-4 h-4" />
                Participants ({participants.length})
              </h3>
            </div>
            
            <div className="space-y-xs">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between p-xs rounded-md hover:bg-white/5">
                  <div className="flex items-center gap-xs">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-white text-sm">{participant.name}</span>
                    {participant.isHost && (
                      <span className="text-primary text-xs">(Host)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-xs">
                    {participant.isAudioOn ? (
                      <Mic className="w-3 h-3 text-success" />
                    ) : (
                      <MicOff className="w-3 h-3 text-error" />
                    )}
                    {participant.isVideoOn ? (
                      <Video className="w-3 h-3 text-success" />
                    ) : (
                      <VideoOff className="w-3 h-3 text-error" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-md flex-1"
          >
            <div className="flex items-center justify-between mb-sm">
              <h3 className="text-white font-medium flex items-center gap-xs">
                <MessageSquare className="w-4 h-4" />
                Chat
              </h3>
            </div>
            
            <div className="space-y-sm text-sm">
              <div className="text-gray-400">
                <span className="text-primary">Alex Chen:</span> Welcome everyone!
              </div>
              <div className="text-gray-400">
                <span className="text-accent">Sarah Wilson:</span> Thanks for organizing this meeting
              </div>
              <div className="text-gray-400">
                <span className="text-success">System:</span> Mike Johnson joined the meeting
              </div>
            </div>

            <div className="mt-sm">
              <input
                type="text"
                placeholder="Type a message..."
                className="glass-input w-full px-sm py-xs rounded-md text-sm focus-ring"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-none border-t border-gray-700 p-md"
      >
        <div className="flex items-center justify-center gap-md">
          {/* Audio Control */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`p-md rounded-full ${
              isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-error hover:bg-red-600'
            } transition-colors`}
          >
            {isAudioEnabled ? (
              <Mic className="w-5 h-5 text-white" />
            ) : (
              <MicOff className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {/* Video Control */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            className={`p-md rounded-full ${
              isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-error hover:bg-red-600'
            } transition-colors`}
          >
            {isVideoEnabled ? (
              <Video className="w-5 h-5 text-white" />
            ) : (
              <VideoOff className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {/* Screen Share */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-md rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Monitor className="w-5 h-5 text-white" />
          </motion.button>

          {/* Raise Hand */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`p-md rounded-full ${
              isHandRaised ? 'bg-warning hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
            } transition-colors`}
          >
            <Hand className="w-5 h-5 text-white" />
          </motion.button>

          {/* Reactions */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-md rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Smile className="w-5 h-5 text-white" />
          </motion.button>

          {/* More Options */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-md rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </motion.button>

          {/* Dashboard Access */}
          {onNavigateToDashboard && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNavigateToDashboard}
              className="p-md rounded-full bg-primary-500 hover:bg-primary-600 transition-colors"
              title={currentUser.isHost ? "Acceder al Dashboard" : "Ver Analytics"}
            >
              {currentUser.isHost ? (
                <Monitor className="w-5 h-5 text-white" />
              ) : (
                <BarChart3 className="w-5 h-5 text-white" />
              )}
            </motion.button>
          )}

          {/* Leave Call */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onLeaveCall}
            className="p-md rounded-full bg-error hover:bg-red-600 transition-colors ml-md"
          >
            <PhoneOff className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CallRoom;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown, Eye } from 'lucide-react';
import { useCollaboration } from '../contexts/CollaborationContext';

interface UserPresenceIndicatorProps {
  currentSection: string;
}

const UserPresenceIndicator: React.FC<UserPresenceIndicatorProps> = ({ currentSection }) => {
  const { otherUsers, state } = useCollaboration();

  // Usuarios viendo la sección actual
  const usersInSection = otherUsers.filter(user => user.currentSection === currentSection);
  
  // Usuarios viendo otras secciones
  const usersInOtherSections = otherUsers.filter(user => user.currentSection !== currentSection);

  if (usersInSection.length === 0 && usersInOtherSections.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 z-40 space-y-2">
      {/* Usuarios viendo la sección actual */}
      {usersInSection.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-4 min-w-[200px]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">Viendo contigo</span>
          </div>
          
          <div className="space-y-2">
            <AnimatePresence>
              {usersInSection.map(user => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-3 h-3 rounded-full border-2 border-white/50"
                    style={{ backgroundColor: user.color }}
                  />
                  <span className="text-white text-sm">{user.name}</span>
                  {user.isHost && (
                    <div title="Host">
                      <Crown className="w-3 h-3 text-yellow-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Resumen de usuarios en otras secciones */}
      {usersInOtherSections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-3"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">
              {usersInOtherSections.length} en otras secciones
            </span>
          </div>
          
          <div className="flex items-center gap-1 mt-2">
            {usersInOtherSections.slice(0, 3).map(user => (
              <div
                key={user.id}
                className="w-2 h-2 rounded-full border border-white/30"
                style={{ backgroundColor: user.color }}
                title={`${user.name} en ${user.currentSection}`}
              />
            ))}
            {usersInOtherSections.length > 3 && (
              <span className="text-gray-400 text-xs ml-1">
                +{usersInOtherSections.length - 3}
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Indicador de permisos */}
      {!state.currentUser?.isHost && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-orange-500/20 backdrop-blur-xl rounded-xl border border-orange-500/30 p-3"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Solo lectura</span>
          </div>
          <p className="text-orange-200 text-xs mt-1">
            El host controla las interacciones
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default UserPresenceIndicator;
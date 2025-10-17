import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollaboration } from '../contexts/CollaborationContext';

interface CollaborativeCursorsProps {
  currentSection: string;
}

const CollaborativeCursors: React.FC<CollaborativeCursorsProps> = ({ currentSection }) => {
  const { otherUsers } = useCollaboration();

  // Filtrar usuarios que están en la misma sección
  const usersInSection = otherUsers.filter(user => 
    user.currentSection === currentSection && user.cursor
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {usersInSection.map(user => (
          user.cursor && (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                position: 'absolute',
                left: user.cursor.x,
                top: user.cursor.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="flex items-center gap-2"
            >
              {/* Cursor personalizado */}
              <motion.div
                className="relative"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 3L18 12L13 14L11 19L7.5 3Z"
                    fill={user.color}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Tooltip con nombre del usuario */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium border"
                style={{ borderColor: user.color }}
              >
                {user.name}
              </motion.div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CollaborativeCursors;
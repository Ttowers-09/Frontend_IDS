import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Tipos para el sistema de colaboración
interface User {
  id: string;
  name: string;
  isHost: boolean;
  cursor?: {
    x: number;
    y: number;
    section: string;
  };
  currentSection: string;
  color: string;
}

interface CollaborationState {
  callId: string;
  users: User[];
  currentUser: User | null;
  sharedAnalytics: any;
  cursors: Map<string, { x: number; y: number; section: string }>;
}

interface CollaborationContextType {
  state: CollaborationState;
  updateCursor: (x: number, y: number, section: string) => void;
  updateUserSection: (section: string) => void;
  updateAnalytics: (data: any) => void;
  canInteract: boolean;
  otherUsers: User[];
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

interface CollaborationProviderProps {
  children: ReactNode;
  callId: string;
  currentUserId: string;
  currentUserName: string;
  isHost: boolean;
}

// Colores para los cursores de diferentes usuarios
const USER_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const CollaborationProvider: React.FC<CollaborationProviderProps> = ({
  children,
  callId,
  currentUserId,
  currentUserName,
  isHost
}) => {
  const [state, setState] = useState<CollaborationState>(() => {
    const currentUser: User = {
      id: currentUserId,
      name: currentUserName,
      isHost,
      currentSection: 'dashboard',
      color: USER_COLORS[0]
    };

    return {
      callId,
      users: [currentUser],
      currentUser,
      sharedAnalytics: null,
      cursors: new Map(),
    };
  });

  // Simular otros usuarios en la llamada (en producción esto vendría del backend)
  useEffect(() => {
    if (!isHost) return;

    const simulatedUsers: User[] = [
      {
        id: 'user-2',
        name: 'Sarah Wilson',
        isHost: false,
        currentSection: 'analytics',
        color: USER_COLORS[1]
      },
      {
        id: 'user-3',
        name: 'Mike Johnson',
        isHost: false,
        currentSection: 'dashboard',
        color: USER_COLORS[2]
      }
    ];

    setState(prev => ({
      ...prev,
      users: [...prev.users, ...simulatedUsers]
    }));
  }, [isHost]);

  const updateCursor = (x: number, y: number, section: string) => {
    setState(prev => {
      const newCursors = new Map(prev.cursors);
      newCursors.set(currentUserId, { x, y, section });
      
      return {
        ...prev,
        cursors: newCursors,
        users: prev.users.map(user => 
          user.id === currentUserId 
            ? { ...user, cursor: { x, y, section } }
            : user
        )
      };
    });

    // En producción: enviar al backend via WebSocket
    // websocket.send(JSON.stringify({ type: 'cursor', x, y, section, userId: currentUserId }));
  };

  const updateUserSection = (section: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(user => 
        user.id === currentUserId 
          ? { ...user, currentSection: section }
          : user
      )
    }));

    // En producción: enviar al backend
    // websocket.send(JSON.stringify({ type: 'section', section, userId: currentUserId }));
  };

  const updateAnalytics = (data: any) => {
    // Solo el host puede actualizar los analytics
    if (!isHost) return;

    setState(prev => ({
      ...prev,
      sharedAnalytics: data
    }));

    // En producción: enviar al backend
    // websocket.send(JSON.stringify({ type: 'analytics', data, userId: currentUserId }));
  };

  const canInteract = state.currentUser?.isHost || false;
  const otherUsers = state.users.filter(user => user.id !== currentUserId);

  return (
    <CollaborationContext.Provider value={{
      state,
      updateCursor,
      updateUserSection,
      updateAnalytics,
      canInteract,
      otherUsers
    }}>
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (context === undefined) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

export default CollaborationContext;
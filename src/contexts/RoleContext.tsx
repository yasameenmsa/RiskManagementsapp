import { createContext, useContext, useState } from 'react';
import { Role } from '../types/role';
import { roles as initialRoles } from '../data/roleData';

interface RoleContextType {
  roles: Role[];
  addRole: (role: Omit<Role, 'id' | 'status'>) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const addRole = (newRole: Omit<Role, 'id' | 'status'>) => {
    const role: Role = {
      ...newRole,
      id: roles.length + 1,
      status: 'Pending',
    };
    setRoles(prevRoles => [...prevRoles, role]);
  };

  return (
    <RoleContext.Provider value={{ roles, addRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
}
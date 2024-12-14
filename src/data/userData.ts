import { User } from '../types/user';

export const users: User[] = [
  {
    id: '1',
    name: 'John Anderson',
    email: 'j.anderson@company.com',
    jobTitle: 'Senior Manager',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-03-10T15:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 's.wilson@company.com',
    jobTitle: 'Project Manager',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
    createdAt: '2024-01-20T09:00:00Z',
    lastLogin: '2024-03-09T14:20:00Z'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'm.chen@company.com',
    jobTitle: 'Developer',
    role: 'User',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'inactive',
    createdAt: '2024-02-01T11:30:00Z',
    lastLogin: '2024-03-01T09:15:00Z'
  }
];

export const roles = [
  { value: 'Admin', label: 'Administrator' },
  { value: 'Manager', label: 'Manager' },
  { value: 'User', label: 'Regular User' }
];

export const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];
export interface User {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface SortConfig {
  key: keyof User;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  search: string;
  role: string;
  status: string;
}
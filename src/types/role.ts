export type RoleStatus = 'Delivered' | 'Pending' | 'Rejected';

export interface Role {
  id: number;
  moduleName: string;
  workflow: string;
  status: RoleStatus;
  image?: string;
  templateType?: string;
  accessType?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
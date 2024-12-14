import { Role, FilterOption } from '../types/role';

export const roles: Role[] = [
  {
    id: 1,
    moduleName: 'System Administrator',
    workflow: 'Full System Access',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    moduleName: 'Audit Manager',
    workflow: 'Audit Review Process',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    moduleName: 'Risk Analyst',
    workflow: 'Risk Assessment Flow',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    moduleName: 'Compliance Officer',
    workflow: 'Compliance Review',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    moduleName: 'Internal Auditor',
    workflow: 'Audit Execution',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 6,
    moduleName: 'External Auditor',
    workflow: 'External Review',
    status: 'Rejected',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const templateTypes: FilterOption[] = [
  { value: 'audit', label: 'Audit Template' },
  { value: 'risk', label: 'Risk Assessment' },
  { value: 'compliance', label: 'Compliance Review' },
  { value: 'investigation', label: 'Investigation' }
];

export const accessTypes: FilterOption[] = [
  { value: 'full', label: 'Full Access' },
  { value: 'read', label: 'Read Only' },
  { value: 'write', label: 'Write Only' },
  { value: 'custom', label: 'Custom Access' }
];

export const workflowTypes: FilterOption[] = [
  { value: 'audit_review', label: 'Audit Review Process' },
  { value: 'risk_assessment', label: 'Risk Assessment Flow' },
  { value: 'compliance_review', label: 'Compliance Review' },
  { value: 'investigation', label: 'Investigation Process' },
  { value: 'approval', label: 'Approval Workflow' }
];
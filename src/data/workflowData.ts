import { Users, FileCheck, AlertTriangle, FileSearch } from 'lucide-react';

export interface WorkflowItem {
  id: number;
  assignUser: string;
  userRole: string;
  approvingOrder: string;
  status: 'Delivered' | 'Pending' | 'Rejected';
  userImage: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  type: 'audit' | 'risk' | 'compliance' | 'investigation';
  description: string;
}

export const workflowData: WorkflowItem[] = [
  {
    id: 1,
    assignUser: "Sarah Wilson",
    userRole: "Senior Auditor",
    approvingOrder: "Annual Financial Audit Review",
    status: "Delivered",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dueDate: "2024-03-15",
    priority: "High",
    type: "audit",
    description: "Complete review of Q4 financial statements and supporting documentation"
  },
  {
    id: 2,
    assignUser: "Michael Chen",
    userRole: "Risk Analyst",
    approvingOrder: "Cybersecurity Risk Assessment",
    status: "Pending",
    userImage: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dueDate: "2024-03-20",
    priority: "High",
    type: "risk",
    description: "Evaluate and document potential cybersecurity threats and vulnerabilities"
  },
  {
    id: 3,
    assignUser: "Emily Rodriguez",
    userRole: "Compliance Officer",
    approvingOrder: "Regulatory Compliance Check",
    status: "Pending",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dueDate: "2024-03-18",
    priority: "Medium",
    type: "compliance",
    description: "Review compliance with updated financial regulations"
  },
  {
    id: 4,
    assignUser: "David Thompson",
    userRole: "Internal Investigator",
    approvingOrder: "Internal Process Review",
    status: "Rejected",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dueDate: "2024-03-10",
    priority: "Low",
    type: "investigation",
    description: "Investigate reported irregularities in procurement process"
  },
  {
    id: 5,
    assignUser: "Lisa Parker",
    userRole: "External Auditor",
    approvingOrder: "Tax Compliance Audit",
    status: "Delivered",
    userImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dueDate: "2024-03-25",
    priority: "Medium",
    type: "audit",
    description: "Review and verify tax compliance documentation"
  }
];

export const workflowTypes = [
  { 
    value: 'audit', 
    label: 'Audit Workflow',
    icon: FileCheck,
    description: 'Systematic review and evaluation of financial records'
  },
  { 
    value: 'risk', 
    label: 'Risk Assessment',
    icon: AlertTriangle,
    description: 'Identification and analysis of potential risks'
  },
  { 
    value: 'compliance', 
    label: 'Compliance Review',
    icon: FileSearch,
    description: 'Evaluation of adherence to regulatory requirements'
  },
  { 
    value: 'investigation', 
    label: 'Investigation Process',
    icon: Users,
    description: 'In-depth examination of specific issues or concerns'
  }
];

export const approvers = [
  {
    id: '1',
    name: 'John Anderson',
    role: 'Audit Director',
    department: 'Internal Audit',
    email: 'j.anderson@company.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'Risk Management Head',
    department: 'Risk Management',
    email: 'm.garcia@company.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Robert Kim',
    role: 'Compliance Director',
    department: 'Compliance',
    email: 'r.kim@company.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'Investigation Lead',
    department: 'Internal Investigation',
    email: 's.johnson@company.com',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];
export type RiskSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type RiskStatus = 'Active' | 'Mitigated' | 'Under Review' | 'Closed';
export type ControlType = 'Preventive' | 'Detective' | 'Corrective';
export type ControlFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';

export interface RiskCategoryItem {
  id: string;
  image: string;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Risk {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: RiskSeverity;
  likelihood: number;
  impact: number;
  status: RiskStatus;
  owner: string;
  department: string;
  createdAt: string;
  lastReview?: string;
  controls: RiskControl[];
  metrics: RiskMetric[];
}

export interface RiskControl {
  id: string;
  name: string;
  type: ControlType;
  frequency: ControlFrequency;
  effectiveness: number;
  lastTested?: string;
  owner: string;
  status: 'Active' | 'Inactive';
}

export interface RiskMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  updatedAt: string;
}
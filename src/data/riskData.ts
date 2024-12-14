import { Risk, RiskControl, RiskMetric } from '../types/risk';

export const riskControls: RiskControl[] = [
  {
    id: '1',
    name: 'Access Control Review',
    type: 'Preventive',
    frequency: 'Monthly',
    effectiveness: 85,
    lastTested: '2024-02-15',
    owner: 'Sarah Wilson',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Data Backup Verification',
    type: 'Detective',
    frequency: 'Daily',
    effectiveness: 95,
    lastTested: '2024-03-01',
    owner: 'Michael Chen',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Vendor Due Diligence',
    type: 'Preventive',
    frequency: 'Quarterly',
    effectiveness: 75,
    lastTested: '2024-01-10',
    owner: 'John Anderson',
    status: 'Active'
  }
];

export const riskMetrics: RiskMetric[] = [
  {
    id: '1',
    name: 'Security Incidents',
    value: 3,
    target: 0,
    unit: 'incidents',
    trend: 'down',
    updatedAt: '2024-03-01'
  },
  {
    id: '2',
    name: 'Control Effectiveness',
    value: 85,
    target: 95,
    unit: '%',
    trend: 'up',
    updatedAt: '2024-03-01'
  },
  {
    id: '3',
    name: 'Risk Mitigation Rate',
    value: 78,
    target: 85,
    unit: '%',
    trend: 'stable',
    updatedAt: '2024-03-01'
  }
];

export const risks: Risk[] = [
  {
    id: '1',
    name: 'Data Security Breach',
    description: 'Risk of unauthorized access to sensitive data',
    category: 'Information Security',
    severity: 'Critical',
    likelihood: 3,
    impact: 5,
    status: 'Active',
    owner: 'Sarah Wilson',
    department: 'IT Security',
    createdAt: '2024-01-15',
    lastReview: '2024-03-01',
    controls: [riskControls[0], riskControls[1]],
    metrics: [riskMetrics[0]]
  },
  {
    id: '2',
    name: 'Vendor Service Disruption',
    description: 'Risk of critical service interruption from key vendors',
    category: 'Operational',
    severity: 'High',
    likelihood: 2,
    impact: 4,
    status: 'Under Review',
    owner: 'John Anderson',
    department: 'Operations',
    createdAt: '2024-01-20',
    lastReview: '2024-02-28',
    controls: [riskControls[2]],
    metrics: [riskMetrics[1]]
  },
  {
    id: '3',
    name: 'Regulatory Non-Compliance',
    description: 'Risk of failing to meet regulatory requirements',
    category: 'Compliance',
    severity: 'High',
    likelihood: 2,
    impact: 5,
    status: 'Active',
    owner: 'Emily Rodriguez',
    department: 'Compliance',
    createdAt: '2024-02-01',
    lastReview: '2024-03-01',
    controls: [riskControls[0], riskControls[2]],
    metrics: [riskMetrics[2]]
  }
];
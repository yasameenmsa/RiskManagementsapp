import { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface RoleFiltersProps {
  templateType: string;
  accessType: string;
  workflow: string;
  onTemplateTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onAccessTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onWorkflowChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  templateTypes: FilterOption[];
  accessTypes: FilterOption[];
  workflowTypes: FilterOption[];
}

export default function RoleFilters({
  templateType,
  accessType,
  workflow,
  onTemplateTypeChange,
  onAccessTypeChange,
  onWorkflowChange,
  templateTypes,
  accessTypes,
  workflowTypes,
}: RoleFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="relative">
        <select
          value={templateType}
          onChange={onTemplateTypeChange}
          className="w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">Select Type For Template</option>
          {templateTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={accessType}
          onChange={onAccessTypeChange}
          className="w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">Select Access type</option>
          {accessTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={workflow}
          onChange={onWorkflowChange}
          className="w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">Filter by Workflow</option>
          {workflowTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
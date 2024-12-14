import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleFilters from '../../components/role/RoleFilters';
import RolesTable from '../../components/role/RolesTable';
import { templateTypes, accessTypes, workflowTypes } from '../../data/roleData';
import { useRoles } from '../../contexts/RoleContext';

export default function RoleManagement() {
  const navigate = useNavigate();
  const { roles } = useRoles();
  const [templateType, setTemplateType] = useState('');
  const [accessType, setAccessType] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Role</h1>
        <button 
          onClick={() => navigate('/roles/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Role
        </button>
      </div>

      <RoleFilters
        templateType={templateType}
        accessType={accessType}
        workflow={selectedWorkflow}
        onTemplateTypeChange={(e) => setTemplateType(e.target.value)}
        onAccessTypeChange={(e) => setAccessType(e.target.value)}
        onWorkflowChange={(e) => setSelectedWorkflow(e.target.value)}
        templateTypes={templateTypes}
        accessTypes={accessTypes}
        workflowTypes={workflowTypes}
      />

      <RolesTable
        roles={roles}
        selectedWorkflow={selectedWorkflow}
        templateType={templateType}
        accessType={accessType}
      />
    </div>
  );
}
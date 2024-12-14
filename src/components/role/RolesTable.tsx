import RoleItem from './RoleItem';
import { Role } from '../../types/role';

interface RolesTableProps {
  roles: Role[];
  selectedWorkflow: string;
  templateType: string;
  accessType: string;
}

export default function RolesTable({ 
  roles, 
  selectedWorkflow,
  templateType,
  accessType 
}: RolesTableProps) {
  const filteredRoles = roles.filter(role => {
    const matchesWorkflow = !selectedWorkflow || 
      role.workflow.toLowerCase().includes(selectedWorkflow.toLowerCase().replace('_', ' '));
    
    const matchesTemplate = !templateType ||
      role.moduleName.toLowerCase().includes(templateType.toLowerCase().replace('_', ' '));
    
    const matchesAccess = !accessType ||
      role.workflow.toLowerCase().includes(accessType.toLowerCase().replace('_', ' '));

    return matchesWorkflow && matchesTemplate && matchesAccess;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Roles</h2>
      </div>

      <div className="divide-y divide-gray-200">
        <div className="px-6 py-3 bg-gray-50 grid grid-cols-12 text-sm font-medium text-gray-500">
          <div className="col-span-5">Role Name</div>
          <div className="col-span-5">Assign WorkFlow</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {filteredRoles.length > 0 ? (
          filteredRoles.map((role) => (
            <RoleItem
              key={role.id}
              id={role.id}
              moduleName={role.moduleName}
              workflow={role.workflow}
              status={role.status}
              image={role.image}
            />
          ))
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            No roles match the selected filters
          </div>
        )}
      </div>
    </div>
  );
}
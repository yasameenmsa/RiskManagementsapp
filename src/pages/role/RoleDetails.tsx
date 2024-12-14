import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Clock, Settings, AlertCircle } from 'lucide-react';
import { roles } from '../../data/roleData';
import { cn } from '../../lib/utils';

const tabs = [
  { id: 'overview', name: 'Overview', icon: Users },
  { id: 'permissions', name: 'Permissions', icon: Shield },
  { id: 'history', name: 'History', icon: Clock },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const permissionCategories = [
  {
    name: 'Dashboard',
    permissions: ['View Dashboard', 'Export Reports', 'View Analytics']
  },
  {
    name: 'User Management',
    permissions: ['Create Users', 'Edit Users', 'Delete Users', 'Assign Roles']
  },
  {
    name: 'Risk Management',
    permissions: ['Create Risks', 'Edit Risks', 'Delete Risks', 'Approve Risk Assessments']
  },
  {
    name: 'Audit',
    permissions: ['Create Audits', 'Edit Audits', 'Delete Audits', 'Approve Audit Reports']
  }
];

export default function RoleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = roles.find(r => r.id === Number(id));
  
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Role not found</h3>
          <p className="mt-1 text-sm text-gray-500">The role you're looking for doesn't exist.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/roles')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Go back to roles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/roles')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Role Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                {role.image ? (
                  <img src={role.image} alt={role.moduleName} className="h-full w-full object-cover" />
                ) : (
                  <Users className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">{role.moduleName}</h2>
                <p className="text-sm text-gray-500">{role.workflow}</p>
              </div>
              <span className={cn(
                "ml-auto px-3 py-1 rounded-full text-xs font-medium",
                role.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                role.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              )}>
                {role.status}
              </span>
            </div>
          </div>

          <div className="px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className="group inline-flex items-center px-1 py-4 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Role Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Role Name</label>
                  <p className="mt-1 text-sm text-gray-900">{role.moduleName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Workflow</label>
                  <p className="mt-1 text-sm text-gray-900">{role.workflow}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={cn(
                    "mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    role.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    role.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  )}>
                    {role.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Created Date</label>
                  <p className="mt-1 text-sm text-gray-900">Jan 15, 2024</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Permissions Overview</h3>
              <div className="space-y-4">
                {permissionCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">{category.name}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {category.permissions.map((permission) => (
                        <div key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={role.moduleName === 'System Administrator'}
                            readOnly
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            {permission}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
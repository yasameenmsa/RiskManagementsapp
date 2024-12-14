import CreateRoleForm from '../../components/role/CreateRoleForm';

export default function CreateRole() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Create New Role</h1>
      </div>

      <CreateRoleForm />
    </div>
  );
}
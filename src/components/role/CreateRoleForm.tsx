import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { templateTypes, workflowTypes, accessTypes } from '../../data/roleData';
import { cn } from '../../lib/utils';
import { useRoles } from '../../contexts/RoleContext';
import toast from 'react-hot-toast';
import ImageUpload from '../ImageUpload';
import { useState } from 'react';

const roleSchema = z.object({
  moduleName: z.string().min(3, 'Role name must be at least 3 characters'),
  workflow: z.string().min(1, 'Please select a workflow'),
  templateType: z.string().min(1, 'Please select a template type'),
  accessType: z.string().min(1, 'Please select an access type'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type RoleFormData = z.infer<typeof roleSchema>;

export default function CreateRoleForm() {
  const navigate = useNavigate();
  const { addRole } = useRoles();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
  });

  const handleImageChange = (url: string | null) => {
    setImageError('');
    setImageUrl(url);
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      if (!imageUrl && !imageError) {
        setImageError('Please upload a role image');
        return;
      }

      addRole({
        moduleName: data.moduleName,
        workflow: data.workflow,
        templateType: data.templateType,
        accessType: data.accessType,
        image: imageUrl || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
      });

      toast.success('Role created successfully');
      navigate('/roles');
    } catch (error) {
      toast.error('Failed to create role');
      console.error('Failed to create role:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Create New Role</h2>
              <p className="text-sm text-gray-500">Set up a new role with specific permissions and access levels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Image
              </label>
              <ImageUpload 
                onImageChange={handleImageChange} 
                error={imageError}
                folder="roles"
              />
            </div>

            <div>
              <label htmlFor="moduleName" className="block text-sm font-medium text-gray-700">
                Role Name
              </label>
              <input
                type="text"
                id="moduleName"
                {...register('moduleName')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.moduleName && "border-red-300"
                )}
              />
              {errors.moduleName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.moduleName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="workflow" className="block text-sm font-medium text-gray-700">
                Workflow
              </label>
              <select
                id="workflow"
                {...register('workflow')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.workflow && "border-red-300"
                )}
              >
                <option value="">Select a workflow</option>
                {workflowTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.workflow && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.workflow.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="templateType" className="block text-sm font-medium text-gray-700">
                Template Type
              </label>
              <select
                id="templateType"
                {...register('templateType')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.templateType && "border-red-300"
                )}
              >
                <option value="">Select a template type</option>
                {templateTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.templateType && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.templateType.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="accessType" className="block text-sm font-medium text-gray-700">
                Access Type
              </label>
              <select
                id="accessType"
                {...register('accessType')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.accessType && "border-red-300"
                )}
              >
                <option value="">Select access type</option>
                {accessTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.accessType && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.accessType.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.description && "border-red-300"
                )}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end space-x-3 rounded-b-lg">
          <button
            type="button"
            onClick={() => navigate('/roles')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Role'}
          </button>
        </div>
      </div>
    </form>
  );
}
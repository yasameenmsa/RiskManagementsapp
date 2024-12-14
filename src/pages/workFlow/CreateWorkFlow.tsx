import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';
import { workflowTypes, approvers } from '../../data/workflowData';

const workflowSchema = z.object({
  name: z.string().min(3, 'Workflow name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.string().min(1, 'Please select a workflow type'),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(['High', 'Medium', 'Low']),
  approvers: z.array(z.string()).min(1, 'At least one approver is required'),
});

type WorkflowFormData = z.infer<typeof workflowSchema>;

export default function CreateWorkFlow() {
  const navigate = useNavigate();
  const [selectedApprovers, setSelectedApprovers] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkflowFormData>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      approvers: [],
      priority: 'Medium',
    },
  });

  const onSubmit = async (data: WorkflowFormData) => {
    try {
      // TODO: Implement workflow creation logic
      console.log('Workflow data:', data);
      toast.success('Workflow created successfully');
      navigate('/workflow');
    } catch (error) {
      toast.error('Failed to create workflow');
      console.error('Failed to create workflow:', error);
    }
  };

  const toggleApprover = (approverId: string) => {
    setSelectedApprovers((prev) =>
      prev.includes(approverId)
        ? prev.filter((id) => id !== approverId)
        : [...prev, approverId]
    );
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
              <h2 className="text-lg font-medium text-gray-900">Create New Workflow</h2>
              <p className="text-sm text-gray-500">Define a new workflow process with approvers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Workflow Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.name && "border-red-300"
                )}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Workflow Type
                </label>
                <select
                  id="type"
                  {...register('type')}
                  className={cn(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    errors.type && "border-red-300"
                  )}
                >
                  <option value="">Select a workflow type</option>
                  {workflowTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  {...register('priority')}
                  className={cn(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    errors.priority && "border-red-300"
                  )}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {errors.priority && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.priority.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                {...register('dueDate')}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                  errors.dueDate && "border-red-300"
                )}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            <div>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Approvers
              </label>
              <div className="space-y-2">
                {approvers.map((approver) => (
                  <div
                    key={approver.id}
                    className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                      selectedApprovers.includes(approver.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    )}
                    onClick={() => toggleApprover(approver.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedApprovers.includes(approver.id)}
                      onChange={() => toggleApprover(approver.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3 flex items-center justify-between flex-1">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{approver.name}</p>
                        <p className="text-sm text-gray-500">{approver.role}</p>
                      </div>
                      <div className="text-sm text-gray-500">{approver.department}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.approvers && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.approvers.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end space-x-3 rounded-b-lg">
          <button
            type="button"
            onClick={() => navigate('/workflow')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Workflow'}
          </button>
        </div>
      </div>
    </form>
  );
}
import { useState } from 'react';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { workflowData, workflowTypes } from '../../data/workflowData';
import { cn } from '../../lib/utils';

export default function WorkFlow() {
  const navigate = useNavigate();
  const [selectedWorkflow, setSelectedWorkflow] = useState('');

  const getStatusStyles = (status: typeof workflowData[number]['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700';
      case 'Pending':
        return 'bg-amber-50 text-amber-700';
      case 'Rejected':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getPriorityStyles = (priority: typeof workflowData[number]['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-red-700';
      case 'Medium':
        return 'text-amber-700';
      case 'Low':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };

  const filteredWorkflows = selectedWorkflow
    ? workflowData.filter(item => item.type === selectedWorkflow)
    : workflowData;

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Work Flow</h1>
        <button
          onClick={() => navigate('/workflow/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New WorkFlow
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex space-x-4">
          <div className="w-64">
            <select
              value={selectedWorkflow}
              onChange={(e) => setSelectedWorkflow(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Workflows</option>
              {workflowTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Active Workflows</h3>
          </div>
          
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 grid grid-cols-12 text-sm font-medium text-gray-500">
            <div className="col-span-3">Assigned To</div>
            <div className="col-span-3">Task</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredWorkflows.map((item) => (
              <div 
                key={item.id} 
                className="px-6 py-4 grid grid-cols-12 items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/workflow/${item.id}`)}
              >
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={item.userImage}
                      alt={item.assignUser}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.assignUser}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.userRole}
                    </div>
                  </div>
                </div>
                
                <div className="col-span-3">
                  <div className="text-sm text-gray-900">{item.approvingOrder}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {item.description}
                  </div>
                </div>

                <div className="col-span-2 flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {format(new Date(item.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>

                <div className="col-span-2">
                  <span className={cn(
                    "text-sm font-medium",
                    getPriorityStyles(item.priority)
                  )}>
                    {item.priority}
                  </span>
                </div>

                <div className="col-span-2 text-right">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getStatusStyles(item.status)
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}

            {filteredWorkflows.length === 0 && (
              <div className="px-6 py-8 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No workflows found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No workflows match your current filter settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
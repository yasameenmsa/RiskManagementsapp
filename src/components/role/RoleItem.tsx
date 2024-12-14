import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoleStatus } from '../../types/role';

interface RoleItemProps {
  id: number;
  moduleName: string;
  workflow: string;
  status: RoleStatus;
  image?: string;
}

export default function RoleItem({ id, moduleName, workflow, status, image }: RoleItemProps) {
  const navigate = useNavigate();

  const getStatusStyles = (status: RoleStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-500';
      case 'Pending':
        return 'bg-amber-50 text-amber-500';
      case 'Rejected':
        return 'bg-red-50 text-red-500';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div 
      className="flex items-center py-4 px-6 hover:bg-gray-50 transition-colors cursor-pointer grid grid-cols-12 gap-4"
      onClick={() => navigate(`/roles/${id}`)}
    >
      <div className="flex items-center space-x-4 col-span-5">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={moduleName} className="h-full w-full object-cover" />
          ) : (
            <Users className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-900">{moduleName}</span>
      </div>
      
      <div className="col-span-5">
        <span className="text-sm text-gray-600">{workflow}</span>
      </div>
      
      <div className="col-span-2 flex justify-end">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
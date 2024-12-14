import React from 'react';
import { PenSquare, Trash2 } from 'lucide-react';

interface RiskItem {
  image: string;
  departments: string;
  subdepartment: string;
  process: string;
  owner: string;
}

interface RiskTableProps {
  data: RiskItem[];
  onEdit: (item: RiskItem) => void;
  onDelete: (item: RiskItem) => void;
}

const RiskTable: React.FC<RiskTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Departments</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subdepartment</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Process</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img 
                  src={item.image} 
                  alt={item.departments}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.departments}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subdepartment}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.process}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.owner}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button 
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 mx-2"
                >
                  <PenSquare className="h-5 w-5 inline" />
                </button>
                <button 
                  onClick={() => onDelete(item)}
                  className="text-red-600 hover:text-red-800 mx-2"
                >
                  <Trash2 className="h-5 w-5 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
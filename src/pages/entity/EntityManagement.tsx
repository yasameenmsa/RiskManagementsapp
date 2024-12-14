import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useDebounce from '../../hooks/useDebounce';
import { cn } from '../../lib/utils';

interface Entity {
  id: string;
  image: string;
  department: string;
  subdepartment: string;
  process: string;
  owner: string;
}

const entities: Entity[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    department: 'Finance',
    subdepartment: 'Finance Operations',
    process: 'General Ledger',
    owner: 'Mohammed Ali'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    department: 'Finance',
    subdepartment: 'Financial Planning & Analysis',
    process: 'Financial Analysis',
    owner: 'Aram'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    department: 'Human Resources',
    subdepartment: 'Recruitment',
    process: 'Recruitment',
    owner: 'Sally'
  }
];

export default function EntityManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredEntities = entities.filter(entity =>
    entity.department.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    entity.subdepartment.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    entity.owner.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Entity">
        <button
          onClick={() => navigate('/entity/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Entity
        </button>
      </PageHeader>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search entities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departments
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subdepartment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Process
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntities.map((entity) => (
                      <tr
                        key={entity.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/entity/${entity.id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-10 w-10 rounded-lg overflow-hidden">
                            <img
                              src={entity.image}
                              alt={entity.department}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {entity.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {entity.subdepartment}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {entity.process}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {entity.owner}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/entity/${entity.id}/edit`);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredEntities.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No entities found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new entity.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing 1-{filteredEntities.length} of {entities.length}
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
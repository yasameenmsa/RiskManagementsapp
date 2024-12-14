import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Building2, Users, FileText, Calendar } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { cn } from '../../lib/utils';

interface Entity {
  id: string;
  image: string;
  department: string;
  subdepartment: string;
  process: string;
  owner: string;
  createdAt: string;
  status: 'active' | 'inactive';
  description: string;
  members: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
}

export default function EntityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call
    const fetchEntity = async () => {
      try {
        // Mock data
        const mockEntity: Entity = {
          id: '1',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
          department: 'Finance',
          subdepartment: 'Finance Operations',
          process: 'General Ledger',
          owner: 'Mohammed Ali',
          createdAt: '2024-03-10T15:30:00Z',
          status: 'active',
          description: 'This entity handles all financial operations including general ledger management, reconciliation, and financial reporting.',
          members: [
            {
              id: '1',
              name: 'Mohammed Ali',
              role: 'Finance Manager',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
              id: '2',
              name: 'Sarah Wilson',
              role: 'Senior Accountant',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
          ]
        };

        setEntity(mockEntity);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load entity details');
        setIsLoading(false);
      }
    };

    fetchEntity();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">{error}</h3>
          <button
            onClick={() => navigate('/entity')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Entities
          </button>
        </div>
      </div>
    );
  }

  if (!entity) return null;

  return (
    <div className="space-y-6">
      <PageHeader title={entity.department} showBack>
        <button
          onClick={() => navigate(`/entity/${id}/edit`)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Edit Entity
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Entity Information</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <div className="h-24 w-24 rounded-lg overflow-hidden">
                <img
                  src={entity.image}
                  alt={entity.department}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Department</label>
                    <p className="mt-1 text-sm text-gray-900">{entity.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Subdepartment</label>
                    <p className="mt-1 text-sm text-gray-900">{entity.subdepartment}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Process</label>
                    <p className="mt-1 text-sm text-gray-900">{entity.process}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={cn(
                      "mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      entity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    )}>
                      {entity.status.charAt(0).toUpperCase() + entity.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{entity.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entity.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardFooter } from '../../components/common/Card';
import ImageUpload from '../../components/common/ImageUpload';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const entitySchema = z.object({
  department: z.string().min(2, 'Department must be at least 2 characters'),
  subdepartment: z.string().min(2, 'Subdepartment must be at least 2 characters'),
  process: z.string().min(2, 'Process must be at least 2 characters'),
  owner: z.string().min(2, 'Owner name must be at least 2 characters'),
  status: z.enum(['active', 'inactive']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type EntityFormData = z.infer<typeof entitySchema>;

export default function EditEntity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
  });

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        // Simulating API call
        const mockEntity = {
          id: '1',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
          department: 'Finance',
          subdepartment: 'Finance Operations',
          process: 'General Ledger',
          owner: 'Mohammed Ali',
          status: 'active' as const,
          description: 'This entity handles all financial operations including general ledger management, reconciliation, and financial reporting.',
        };

        reset(mockEntity);
        setImage(mockEntity.image);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to load entity');
        navigate('/entity');
      }
    };

    fetchEntity();
  }, [id, reset, navigate]);

  const onSubmit = async (data: EntityFormData) => {
    try {
      if (!image) {
        setImageError('Entity image is required');
        return;
      }

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Entity updated successfully');
      navigate(`/entity/${id}`);
    } catch (error) {
      toast.error('Failed to update entity');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Entity" showBack />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entity Image
                </label>
                <ImageUpload
                  onImageChange={(url) => {
                    setImageError('');
                    setImage(url);
                  }}
                  error={imageError}
                  folder="entities"
                  currentImage={image}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    {...register('department')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.department && "border-red-300"
                    )}
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subdepartment" className="block text-sm font-medium text-gray-700">
                    Subdepartment
                  </label>
                  <input
                    type="text"
                    id="subdepartment"
                    {...register('subdepartment')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.subdepartment && "border-red-300"
                    )}
                  />
                  {errors.subdepartment && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.subdepartment.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="process" className="block text-sm font-medium text-gray-700">
                    Process
                  </label>
                  <input
                    type="text"
                    id="process"
                    {...register('process')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.process && "border-red-300"
                    )}
                  />
                  {errors.process && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.process.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
                    Owner
                  </label>
                  <input
                    type="text"
                    id="owner"
                    {...register('owner')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.owner && "border-red-300"
                    )}
                  />
                  {errors.owner && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.owner.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="active"
                        value="active"
                        {...register('status')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                        Active
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="inactive"
                        value="inactive"
                        {...register('status')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="inactive" className="ml-2 text-sm text-gray-700">
                        Inactive
                      </label>
                    </div>
                  </div>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.status.message}
                    </p>
                  )}
                </div>
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
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(`/entity/${id}`)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
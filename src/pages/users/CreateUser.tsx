import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle } from 'lucide-react';
import { roles, statuses } from '../../data/userData';
import { cn } from '../../lib/utils';
import ImageUpload from '../../components/users/ImageUpload';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardFooter } from '../../components/common/Card';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  role: z.string().min(1, 'Please select a role'),
  status: z.enum(['active', 'inactive']),
});

type UserFormData = z.infer<typeof userSchema>;

export default function CreateUser() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: 'active',
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // TODO: Implement actual user creation logic
      console.log('Creating user:', { ...data, avatar });
      toast.success('User created successfully');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to create user');
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create User" showBack />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <ImageUpload
                  onImageChange={(url) => {
                    setAvatarError('');
                    setAvatar(url);
                  }}
                  error={avatarError}
                  folder="avatars"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
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

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.email && "border-red-300"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    {...register('jobTitle')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.jobTitle && "border-red-300"
                    )}
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    {...register('role')}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                      errors.role && "border-red-300"
                    )}
                  >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-2 space-y-2">
                    {statuses.map(status => (
                      <div key={status.value} className="flex items-center">
                        <input
                          type="radio"
                          id={status.value}
                          value={status.value}
                          {...register('status')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={status.value} className="ml-2 text-sm text-gray-700">
                          {status.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
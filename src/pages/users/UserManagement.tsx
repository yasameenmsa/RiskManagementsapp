import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../../components/users/UserTable';
import UserFilters from '../../components/users/UserFilters';
import { User, FilterConfig, SortConfig } from '../../types/user';
import { users as initialUsers } from '../../data/userData';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useDebounce from '../../hooks/useDebounce';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filters, setFilters] = useState<FilterConfig>({
    search: '',
    role: '',
    status: ''
  });
  const [sort, setSort] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);

  const handleSort = (key: keyof User) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesStatus = !filters.status || user.status === filters.status;
    
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sort.key];
    const bValue = b[sort.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="User Management">
        <button
          onClick={() => navigate('/users/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create User
        </button>
      </PageHeader>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <UserFilters
              filters={filters}
              onFilterChange={setFilters}
            />

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <UserTable
                users={filteredUsers}
                sort={sort}
                onSort={handleSort}
                onDelete={(id) => setUsers(users.filter(u => u.id !== id))}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
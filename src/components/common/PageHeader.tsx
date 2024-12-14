import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  showBack?: boolean;
}

export default function PageHeader({ title, children, showBack }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="sm:flex sm:items-center sm:justify-between mb-6">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
        )}
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      {children && (
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {children}
        </div>
      )}
    </div>
  );
}
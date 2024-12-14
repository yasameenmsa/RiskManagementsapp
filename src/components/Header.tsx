import { type FC } from 'react';
import { Bell, Search } from 'lucide-react';

export const Header: FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <select className="text-sm border-none bg-transparent focus:ring-0">
                <option>English</option>
              </select>
              
              <div className="flex items-center space-x-3 border-l pl-3 border-gray-200">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">MB</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Moni Roy</p>
                  <p className="text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { BarChart2, Shield, Users, Activity, FileText, Database, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', active: false },
    { icon: Shield, label: 'Risk & Control', active: true },
    { icon: Activity, label: 'Work Flow', active: false },
    { icon: Users, label: 'User Management', active: false },
    { icon: Database, label: 'Data', active: false },
    { icon: FileText, label: 'Templates', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen sidebar">
      <div className="px-6 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-xl font-bold text-blue-600">Audit</span>
          <span className="text-xl font-bold text-gray-900">System</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
          <button className="flex items-center px-4 py-3 w-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
            <LogOut className="h-5 w-5 mr-3 text-gray-400" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Workflow,
  Building2,
  ShieldAlert,
  MessagesSquare,
  Mail,
  FileBarChart,
  Database,
  UserCog,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const languages = [
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'ar', label: 'العربية', flag: 'sa' },
  { code: 'es', label: 'Español', flag: 'es' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
];

const navigation = [
  {
    section: 'DASHBOARD',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard }
    ]
  },
  {
    section: 'USER MANAGEMENT',
    items: [
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Roles', href: '/roles', icon: UserCog },
      { name: 'Work Flow', href: '/workflow', icon: Workflow }
    ]
  },
  {
    section: 'SETUP',
    items: [
      { name: 'Entity', href: '/entity', icon: Building2 },
      { name: 'Risk & Control', href: '/risks', icon: ShieldAlert },
      { name: 'Engagement', href: '/engagement', icon: MessagesSquare }
    ]
  },
  {
    section: 'TEMPLATES',
    items: [
      { name: 'Email Templates', href: '/email-templates', icon: Mail },
      { name: 'Report Templates', href: '/report-templates', icon: FileBarChart }
    ]
  },
  {
    section: 'DATA',
    items: [
      { name: 'Data', href: '/data', icon: Database },
      { name: 'Settings', href: '/settings', icon: Settings }
    ]
  }
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Fixed Header */}
        <div className="flex h-16 items-center px-6 border-b shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=50&h=50&auto=format&fit=crop"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">AuditSystem</span>
          </Link>
          <button
            className="lg:hidden ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-8 px-4 py-6">
            {navigation.map((section) => (
              <div key={section.section}>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.section}
                </h3>
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="border-t px-4 py-4 shrink-0">
          <button
            onClick={logout}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-blue-600"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 bg-white border-b">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200"
                >
                  <img
                    src={`https://flagcdn.com/${currentLanguage.flag}.svg`}
                    alt={currentLanguage.label}
                    className="h-4 w-4 rounded-sm object-cover"
                  />
                  <span className="hidden sm:inline-block">{currentLanguage.label}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setCurrentLanguage(language);
                            setLanguageMenuOpen(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                          <img
                            src={`https://flagcdn.com/${language.flag}.svg`}
                            alt={language.label}
                            className="h-4 w-4 rounded-sm object-cover mr-2"
                          />
                          {language.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-full py-1 px-2 transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                    alt=""
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                  />
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name || 'John Doe'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {user?.role || 'Admin'}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Activity, Clock, FileText, Database, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

const data = [
  { category: 'Financial', count: 4 },
  { category: 'Operational', count: 6 },
  { category: 'Strategic', count: 3 },
  { category: 'Compliance', count: 5 },
];

const stats = [
  {
    name: 'Total Risks',
    value: '18',
    icon: AlertTriangle,
    change: '+12%',
    changeType: 'increase'
  },
  {
    name: 'High Priority',
    value: '5',
    icon: TrendingUp,
    change: '-2%',
    changeType: 'decrease'
  },
  {
    name: 'Active Users',
    value: '24',
    icon: Users,
    change: '+5%',
    changeType: 'increase'
  },
  {
    name: 'Risk Score',
    value: '72',
    icon: Activity,
    change: '+3%',
    changeType: 'increase'
  }
];

const managementButtons = [
  {
    name: 'User Management',
    icon: UserCircle,
    href: '/users',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    name: 'Set Up Management',
    icon: Clock,
    href: '/setup',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    name: 'Template Management',
    icon: FileText,
    href: '/templates',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    name: 'Data Management',
    icon: Database,
    href: '/data',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {managementButtons.map((button) => (
          <Link
            key={button.name}
            to={button.href}
            className="relative overflow-hidden rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`rounded-lg ${button.bgColor} p-3`}>
                <button.icon className={`h-6 w-6 ${button.iconColor}`} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{button.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="relative overflow-hidden">
            <CardContent className="px-4 py-5 sm:p-6">
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Risks by Category</h3>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="flow-root">
              <ul className="-mb-8">
                {[1, 2, 3].map((item, itemIdx) => (
                  <li key={item}>
                    <div className="relative pb-8">
                      {itemIdx !== 2 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <AlertTriangle className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              New high-priority risk identified
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            1h ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
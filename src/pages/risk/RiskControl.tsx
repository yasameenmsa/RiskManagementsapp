import { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Download, 
  BarChart2, 
  Settings2, 
  Clock, 
  Star, 
  Eye, 
  UserCog,
  AlertTriangle,
  Gauge,
  Shield 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RiskCategory from '../../components/RiskCategory';
import InherentRiskSetup from '../../components/InherentRiskSetup';
import InherentScoreSetup from '../../components/InherentScoreSetup';
import ControlCategory from '../../components/ControlCategory';
import ControlFrequency from '../../components/ControlFrequency';
import ControlRating from '../../components/ControlRating';
import ObservationRating from '../../components/ObservationRating';
import UserSettings from '../../components/UserSettings';

const tabs = [
  { 
    id: 'risk-category', 
    name: 'Risk',
    icon: AlertTriangle,
    description: 'Manage and categorize different types of risks'
  },
  { 
    id: 'inherent-risk-setup', 
    name: 'Inherent',
    icon: Shield,
    description: 'Configure inherent risk parameters and thresholds'
  },
  { 
    id: 'inherent-score-setup', 
    name: 'Scoring',
    icon: Gauge,
    description: 'Set up scoring criteria for inherent risks'
  },
  { 
    id: 'control-category', 
    name: 'Controls',
    icon: Settings2,
    description: 'Define and manage control categories'
  },
  { 
    id: 'control-frequency', 
    name: 'Frequency',
    icon: Clock,
    description: 'Set control assessment frequencies'
  },
  { 
    id: 'control-rating', 
    name: 'Rating',
    icon: Star,
    description: 'Configure control effectiveness ratings'
  },
  { 
    id: 'observation-rating', 
    name: 'Observations',
    icon: Eye,
    description: 'Manage observation severity ratings'
  },
  { 
    id: 'user-setting', 
    name: 'Settings',
    icon: UserCog,
    description: 'Configure user preferences and settings'
  }
];

export default function RiskControl() {
  const [activeTab, setActiveTab] = useState('risk-category');
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'risk-category':
        return <RiskCategory />;
      case 'inherent-risk-setup':
        return <InherentRiskSetup />;
      case 'inherent-score-setup':
        return <InherentScoreSetup />;
      case 'control-category':
        return <ControlCategory />;
      case 'control-frequency':
        return <ControlFrequency />;
      case 'control-rating':
        return <ControlRating />;
      case 'observation-rating':
        return <ObservationRating />;
      case 'user-setting':
        return <UserSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Risk & Control</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage risk categories, controls, and related settings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {/* Export functionality */}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => navigate('/risk-control/create')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </button>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-8 gap-1 px-1 py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-lg
                    transition-colors duration-200 gap-1
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon className={`h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className="text-xs font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Description */}
        <div className="bg-gray-50 px-6 py-2">
          <p className="text-sm text-gray-600">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
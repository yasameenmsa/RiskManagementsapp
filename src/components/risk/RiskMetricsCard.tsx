import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { RiskMetric } from '../../types/risk';

interface RiskMetricsCardProps {
  metrics: RiskMetric[];
}

export default function RiskMetricsCard({ metrics }: RiskMetricsCardProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-emerald-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
            {getTrendIcon(metric.trend)}
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-gray-900">
              {metric.value}
              {metric.unit === '%' ? '%' : ''}
            </span>
            <span className="text-sm text-gray-500">
              / {metric.target}
              {metric.unit === '%' ? '%' : ''}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
              <div
                style={{ width: `${(metric.value / metric.target) * 100}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  metric.value >= metric.target ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Last updated: {new Date(metric.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
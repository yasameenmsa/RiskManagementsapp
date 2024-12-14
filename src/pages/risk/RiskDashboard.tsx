import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { risks, riskControls, riskMetrics } from '../../data/riskData';
import RiskMetricsCard from '../../components/risk/RiskMetricsCard';
import RiskControlsTable from '../../components/risk/RiskControlsTable';
import RiskHeatMap from '../../components/risk/RiskHeatMap';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';

export default function RiskDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRisks = selectedCategory === 'all'
    ? risks
    : risks.filter(risk => risk.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      <PageHeader title="Risk Management Dashboard">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </button>
      </PageHeader>

      <div className="space-y-6">
        <RiskMetricsCard metrics={riskMetrics} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <RiskHeatMap risks={filteredRisks} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Risk Overview</h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="information security">Information Security</option>
                      <option value="operational">Operational</option>
                      <option value="compliance">Compliance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-700">Total Risks</h3>
                    <p className="mt-2 text-3xl font-semibold text-blue-900">{filteredRisks.length}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-amber-700">High Priority</h3>
                    <p className="mt-2 text-3xl font-semibold text-amber-900">
                      {filteredRisks.filter(risk => risk.severity === 'High' || risk.severity === 'Critical').length}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-emerald-700">Mitigated</h3>
                    <p className="mt-2 text-3xl font-semibold text-emerald-900">
                      {filteredRisks.filter(risk => risk.status === 'Mitigated').length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <RiskControlsTable controls={riskControls} />
      </div>
    </div>
  );
}
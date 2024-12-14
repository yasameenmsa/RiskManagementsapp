import { Risk } from '../../types/risk';

interface RiskHeatMapProps {
  risks: Risk[];
}

export default function RiskHeatMap({ risks }: RiskHeatMapProps) {
  const heatMapColors = [
    ['bg-green-100', 'bg-yellow-100', 'bg-orange-100', 'bg-red-100', 'bg-red-200'],
    ['bg-green-100', 'bg-yellow-100', 'bg-orange-100', 'bg-red-100', 'bg-red-200'],
    ['bg-green-200', 'bg-yellow-200', 'bg-orange-200', 'bg-red-200', 'bg-red-300'],
    ['bg-green-300', 'bg-yellow-300', 'bg-orange-300', 'bg-red-300', 'bg-red-400'],
    ['bg-green-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-red-500'],
  ];

  const getRisksForCell = (likelihood: number, impact: number) => {
    return risks.filter(risk => risk.likelihood === likelihood && risk.impact === impact);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Risk Heat Map</h2>
      <div className="relative">
        <div className="absolute -left-6 top-1/2 -rotate-90 transform origin-center whitespace-nowrap text-sm font-medium text-gray-500">
          Likelihood
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[5, 4, 3, 2, 1].map((likelihood) => (
            <div key={likelihood} className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((impact) => {
                const cellRisks = getRisksForCell(likelihood, impact);
                return (
                  <div
                    key={`${likelihood}-${impact}`}
                    className={`${
                      heatMapColors[likelihood - 1][impact - 1]
                    } h-16 rounded-lg flex items-center justify-center relative group`}
                  >
                    {cellRisks.length > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="h-4 w-4 bg-gray-900 rounded-full opacity-75"></span>
                      </div>
                    )}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 z-10">
                      {cellRisks.map(risk => (
                        <div key={risk.id} className="mb-1">
                          {risk.name}
                        </div>
                      ))}
                      {cellRisks.length === 0 && <div>No risks</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-sm font-medium text-gray-500">Impact</div>
      </div>
      <div className="mt-4 flex items-center justify-end space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-green-200 rounded"></div>
          <span className="text-xs text-gray-500">Low</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-yellow-200 rounded"></div>
          <span className="text-xs text-gray-500">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-red-200 rounded"></div>
          <span className="text-xs text-gray-500">High</span>
        </div>
      </div>
    </div>
  );
}
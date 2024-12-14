import { useState } from 'react';
import { Card, CardContent } from './common/Card';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircle } from 'lucide-react';
import { Fragment } from 'react';

export default function UserSettings() {
  const [settings, setSettings] = useState({
    riskCalculation: 'multiplication',
    walkthroughPlacement: 'planning'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSettingChange = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    // Handle save settings
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000); // Auto-hide after 2 seconds
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="space-y-8">
            {/* Residual Risk Calculation Method */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Residual Risk Calculation Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="riskCalculation"
                    value="multiplication"
                    checked={settings.riskCalculation === 'multiplication'}
                    onChange={(e) => handleSettingChange('riskCalculation', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Multiplication</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="riskCalculation"
                    value="addition"
                    checked={settings.riskCalculation === 'addition'}
                    onChange={(e) => handleSettingChange('riskCalculation', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Addition</span>
                </label>
              </div>
            </div>

            {/* Walkthrough Placement */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Walkthrough Placement
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="walkthroughPlacement"
                    value="planning"
                    checked={settings.walkthroughPlacement === 'planning'}
                    onChange={(e) => handleSettingChange('walkthroughPlacement', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Planning Phase</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="walkthroughPlacement"
                    value="fieldwork"
                    checked={settings.walkthroughPlacement === 'fieldwork'}
                    onChange={(e) => handleSettingChange('walkthroughPlacement', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Field Work Phase</span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSave}
              >
                Save Settings
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Popup */}
      <Transition show={showSuccess} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowSuccess(false)}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative bg-white rounded-lg p-6 max-w-sm mx-auto shadow-xl transform transition-all">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />
                  <span className="text-lg font-medium text-gray-900">Settings saved successfully!</span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
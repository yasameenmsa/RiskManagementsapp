import React, { useState } from 'react';
import { PenSquare, Trash2, Plus } from 'lucide-react';
import CreateModal from './modals/CreateModal';
import Input from './common/Input';
import Form from './common/Form';
import { useFormState } from '../hooks/useFormState';
import ConfirmationDialog from './common/ConfirmationDialog';

interface RiskItem {
  id: string;
  type: 'Impact' | 'Likelihood';
  name: string;
  color: string;
  score: number;
}

const initialFormState = {
  type: 'Impact',
  name: '',
  color: '#000000',
  score: ''
};

const InherentRiskSetup = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [risks, setRisks] = useState<RiskItem[]>([
    { id: '1', type: 'Impact', name: 'Critical', color: '#dd0000', score: 5 },
    { id: '2', type: 'Impact', name: 'Likely', color: '#ff0000', score: 4 },
    { id: '3', type: 'Impact', name: 'Possible', color: '#ffa500', score: 3 },
    { id: '4', type: 'Impact', name: 'Unlikely', color: '#00dd00', score: 2 },
    { id: '5', type: 'Likelihood', name: 'Critical', color: '#dd0000', score: 5 },
    { id: '6', type: 'Likelihood', name: 'High', color: '#ff0000', score: 4 },
    { id: '7', type: 'Likelihood', name: 'Low', color: '#00dd00', score: 2 },
    { id: '8', type: 'Likelihood', name: 'Moderate', color: '#ffa500', score: 3 }
  ]);

  const { formData, handleChange, setFormData, resetForm } = useFormState(initialFormState);

  const handleCreateRisk = () => {
    const newRisk: RiskItem = {
      id: (risks.length + 1).toString(),
      type: formData.type as 'Impact' | 'Likelihood',
      name: formData.name,
      color: formData.color,
      score: Number(formData.score)
    };

    setRisks([...risks, newRisk]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditRisk = () => {
    if (!selectedRisk) return;

    const updatedRisks = risks.map(risk => 
      risk.id === selectedRisk.id 
        ? {
            ...risk,
            type: formData.type as 'Impact' | 'Likelihood',
            name: formData.name,
            color: formData.color,
            score: Number(formData.score)
          }
        : risk
    );

    setRisks(updatedRisks);
    setIsEditModalOpen(false);
    setSelectedRisk(null);
    resetForm();
  };

  const handleDeleteRisk = () => {
    if (!selectedRisk) return;
    
    const updatedRisks = risks.filter(risk => risk.id !== selectedRisk.id);
    setRisks(updatedRisks);
    setIsDeleteDialogOpen(false);
    setSelectedRisk(null);
  };

  const openEditModal = (risk: RiskItem) => {
    setSelectedRisk(risk);
    setFormData({
      type: risk.type,
      name: risk.name,
      color: risk.color,
      score: risk.score.toString()
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus className="h-4 w-4 mr-2 inline" />
          Create New Inherent Risk
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-8 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.score}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    <PenSquare className="h-5 w-5 inline" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedRisk(item);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="text-red-600 hover:text-red-900 mx-2"
                  >
                    <Trash2 className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Create Inherent Risk"
      >
        <Form onSubmit={handleCreateRisk} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Risk Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Impact">Impact</option>
              <option value="Likelihood">Likelihood</option>
            </select>
          </div>

          <Input
            label="Risk Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Risk Score (1-5)"
            name="score"
            type="number"
            min="1"
            max="5"
            value={formData.score}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Risk Color
            </label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Create Risk
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      </CreateModal>

      {/* Edit Modal */}
      <CreateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Inherent Risk"
      >
        <Form onSubmit={handleEditRisk} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Risk Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Impact">Impact</option>
              <option value="Likelihood">Likelihood</option>
            </select>
          </div>

          <Input
            label="Risk Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Risk Score (1-5)"
            name="score"
            type="number"
            min="1"
            max="5"
            value={formData.score}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Risk Color
            </label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      </CreateModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Risk"
        message={`Are you sure you want to delete "${selectedRisk?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteRisk}
        onCancel={() => setIsDeleteDialogOpen(false)}
        variant="danger"
      />
    </div>
  );
};

export default InherentRiskSetup;
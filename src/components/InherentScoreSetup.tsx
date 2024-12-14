import React, { useState } from 'react';
import { PenSquare, Trash2, Plus } from 'lucide-react';
import CreateModal from './modals/CreateModal';
import Input from './common/Input';
import Form from './common/Form';
import { useFormState } from '../hooks/useFormState';
import ConfirmationDialog from './common/ConfirmationDialog';

interface ScoreItem {
  id: string;
  name: string;
  scoreFrom: number;
  scoreTo: number;
  color: string;
}

const initialFormState = {
  name: '',
  scoreFrom: '',
  scoreTo: '',
  color: '#000000'
};

const InherentScoreSetup = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState<ScoreItem | null>(null);
  const [scores, setScores] = useState<ScoreItem[]>([
    { id: '1', name: 'Critical', scoreFrom: 21, scoreTo: 25, color: '#dd0000' },
    { id: '2', name: 'High', scoreFrom: 16, scoreTo: 20, color: '#ff0000' },
    { id: '3', name: 'Medium', scoreFrom: 11, scoreTo: 15, color: '#ffd700' },
    { id: '4', name: 'Low', scoreFrom: 6, scoreTo: 10, color: '#ffa500' },
    { id: '5', name: 'Minimal', scoreFrom: 1, scoreTo: 5, color: '#00dd00' }
  ]);

  const { formData, handleChange, setFormData, resetForm } = useFormState(initialFormState);

  const validateScoreRange = (from: number, to: number, currentId?: string): string | null => {
    const overlapping = scores.some(score => {
      if (currentId && score.id === currentId) return false;
      return (from >= score.scoreFrom && from <= score.scoreTo) ||
             (to >= score.scoreFrom && to <= score.scoreTo) ||
             (from <= score.scoreFrom && to >= score.scoreTo);
    });
    
    if (overlapping) {
      return 'Score range overlaps with existing ranges';
    }
    if (from >= to) {
      return 'Start score must be less than end score';
    }
    if (from < 1 || to > 25) {
      return 'Scores must be between 1 and 25';
    }
    return null;
  };

  const handleCreateScore = () => {
    const from = Number(formData.scoreFrom);
    const to = Number(formData.scoreTo);
    
    const error = validateScoreRange(from, to);
    if (error) {
      alert(error);
      return;
    }

    const newScore: ScoreItem = {
      id: (scores.length + 1).toString(),
      name: formData.name,
      scoreFrom: from,
      scoreTo: to,
      color: formData.color
    };

    setScores(prev => [...prev].sort((a, b) => b.scoreFrom - a.scoreFrom));
    setScores(prev => [...prev, newScore]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditScore = () => {
    if (!selectedScore) return;

    const from = Number(formData.scoreFrom);
    const to = Number(formData.scoreTo);
    
    const error = validateScoreRange(from, to, selectedScore.id);
    if (error) {
      alert(error);
      return;
    }

    const updatedScores = scores.map(score => 
      score.id === selectedScore.id 
        ? {
            ...score,
            name: formData.name,
            scoreFrom: from,
            scoreTo: to,
            color: formData.color
          }
        : score
    );

    setScores(updatedScores.sort((a, b) => b.scoreFrom - a.scoreFrom));
    setIsEditModalOpen(false);
    setSelectedScore(null);
    resetForm();
  };

  const handleDeleteScore = () => {
    if (!selectedScore) return;
    
    const updatedScores = scores.filter(score => score.id !== selectedScore.id);
    setScores(updatedScores);
    setIsDeleteDialogOpen(false);
    setSelectedScore(null);
  };

  const openEditModal = (score: ScoreItem) => {
    setSelectedScore(score);
    setFormData({
      name: score.name,
      scoreFrom: score.scoreFrom.toString(),
      scoreTo: score.scoreTo.toString(),
      color: score.color
    });
    setIsEditModalOpen(true);
  };

  const renderScoreForm = (onSubmit: () => void, submitLabel: string) => (
    <Form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Score Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Score From"
          name="scoreFrom"
          type="number"
          min="1"
          max="25"
          value={formData.scoreFrom}
          onChange={handleChange}
          required
        />

        <Input
          label="Score To"
          name="scoreTo"
          type="number"
          min="1"
          max="25"
          value={formData.scoreTo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Score Color
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
          {submitLabel}
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
          }}
        >
          Cancel
        </button>
      </div>
    </Form>
  );

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
          Create New Inherent Score
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Color</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scores.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.scoreFrom} - {item.scoreTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-8 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    <PenSquare className="h-5 w-5 inline" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedScore(item);
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
        title="Create Inherent Score"
      >
        {renderScoreForm(handleCreateScore, 'Create Score')}
      </CreateModal>

      {/* Edit Modal */}
      <CreateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Inherent Score"
      >
        {renderScoreForm(handleEditScore, 'Save Changes')}
      </CreateModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Score"
        message={`Are you sure you want to delete "${selectedScore?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteScore}
        onCancel={() => setIsDeleteDialogOpen(false)}
        variant="danger"
      />
    </div>
  );
};

export default InherentScoreSetup;
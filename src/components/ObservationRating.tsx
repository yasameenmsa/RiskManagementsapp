import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import FormModal from './modals/FormModal';
import Button from './common/Button';
import Input from './common/Input';
import TextArea from './common/TextArea';
import ActionButtons from './common/ActionButtons';
import ConfirmationDialog from './common/ConfirmationDialog';

interface ObservationRatingItem {
  id: string;
  name: string;
  description: string;
  score: number;
  color: string;
}

const initialFormState = {
  name: '',
  description: '',
  score: '',
  color: '#000000'
};

export default function ObservationRating() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<ObservationRatingItem | null>(null);
  const { showSuccess, showError } = useToast();
  const [ratings, setRatings] = useState<ObservationRatingItem[]>([
    { 
      id: '1',
      name: 'Critical',
      description: 'Significant impact on business operations',
      score: 5,
      color: '#FF4444'
    },
    { 
      id: '2',
      name: 'High',
      description: 'Major impact on business processes',
      score: 4,
      color: '#FF8C00'
    },
    { 
      id: '3',
      name: 'Medium',
      description: 'Moderate impact on operations',
      score: 3,
      color: '#FFD700'
    },
    { 
      id: '4',
      name: 'Low',
      description: 'Minor impact on processes',
      score: 2,
      color: '#4CAF50'
    },
    { 
      id: '5',
      name: 'Negligible',
      description: 'Minimal or no impact',
      score: 1,
      color: '#90EE90'
    }
  ]);

  const {
    formData,
    handleChange,
    setFormData,
    resetForm,
    validate
  } = useForm(initialFormState);

  const validationRules = {
    name: (value: string) => !value ? 'Rating name is required' : undefined,
    description: (value: string) => !value ? 'Description is required' : undefined,
    score: (value: string) => {
      if (!value) return 'Score is required';
      const num = Number(value);
      if (isNaN(num) || num < 1 || num > 5) return 'Score must be between 1 and 5';
      return undefined;
    },
    color: (value: string) => !value ? 'Color is required' : undefined
  };

  const handleCreateRating = () => {
    if (!validate(validationRules)) return;

    const newRating: ObservationRatingItem = {
      id: (ratings.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      score: Number(formData.score),
      color: formData.color
    };

    setRatings([...ratings, newRating]);
    showSuccess('Observation rating created successfully');
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditRating = () => {
    if (!selectedRating || !validate(validationRules)) return;

    const updatedRatings = ratings.map(rating =>
      rating.id === selectedRating.id
        ? {
            ...rating,
            name: formData.name,
            description: formData.description,
            score: Number(formData.score),
            color: formData.color
          }
        : rating
    );

    setRatings(updatedRatings);
    showSuccess('Observation rating updated successfully');
    setIsEditModalOpen(false);
    setSelectedRating(null);
    resetForm();
  };

  const handleDeleteRating = () => {
    if (!selectedRating) return;

    const updatedRatings = ratings.filter(rating => rating.id !== selectedRating.id);
    setRatings(updatedRatings);
    showSuccess('Observation rating deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedRating(null);
  };

  const openEditModal = (rating: ObservationRatingItem) => {
    setSelectedRating(rating);
    setFormData({
      name: rating.name,
      description: rating.description,
      score: rating.score.toString(),
      color: rating.color
    });
    setIsEditModalOpen(true);
  };

  const renderForm = (onSubmit: () => void, submitLabel: string) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <Input
        label="Rating Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={validationRules.name(formData.name)}
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={validationRules.description(formData.description)}
        rows={3}
        required
      />

      <Input
        label="Score (1-5)"
        name="score"
        type="number"
        min="1"
        max="5"
        value={formData.score}
        onChange={handleChange}
        error={validationRules.score(formData.score)}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="secondary"
          onClick={() => {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Observation Rating
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ratings.map((rating) => (
              <tr key={rating.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: rating.color }}></div>
                    <span className="text-sm font-medium text-gray-900">{rating.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{rating.description}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {rating.score}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-8 rounded" style={{ backgroundColor: rating.color }}></div>
                    <span className="text-sm text-gray-600">{rating.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ActionButtons
                    onEdit={() => openEditModal(rating)}
                    onDelete={() => {
                      setSelectedRating(rating);
                      setIsDeleteDialogOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Create Observation Rating"
      >
        {renderForm(handleCreateRating, 'Create Rating')}
      </FormModal>

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Observation Rating"
      >
        {renderForm(handleEditRating, 'Save Changes')}
      </FormModal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Rating"
        message={`Are you sure you want to delete "${selectedRating?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteRating}
        onCancel={() => setIsDeleteDialogOpen(false)}
        variant="danger"
      />
    </div>
  );
}
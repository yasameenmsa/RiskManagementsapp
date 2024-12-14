import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import FormModal from './modals/FormModal';
import Button from './common/Button';
import Input from './common/Input';
import ActionButtons from './common/ActionButtons';
import ConfirmationDialog from './common/ConfirmationDialog';

interface RatingItem {
  id: string;
  name: string;
  rating: number;
  color: string;
}

const initialFormState = {
  name: '',
  rating: '',
  color: '#000000'
};

export default function ControlRating() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<RatingItem | null>(null);
  const { showSuccess, showError } = useToast();
  const [ratings, setRatings] = useState<RatingItem[]>([
    { id: '1', name: 'Effective', rating: 2, color: '#00dd00' },
    { id: '2', name: 'Ineffective', rating: 4, color: '#ff0000' },
    { id: '3', name: 'No controls', rating: 5, color: '#dd0000' },
    { id: '4', name: 'Partially effective', rating: 3, color: '#ffa500' },
    { id: '5', name: 'Robust', rating: 1, color: '#00ff00' }
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
    rating: (value: string) => {
      if (!value) return 'Rating is required';
      const num = Number(value);
      if (isNaN(num) || num < 1 || num > 5) return 'Rating must be between 1 and 5';
      return undefined;
    },
    color: (value: string) => !value ? 'Color is required' : undefined
  };

  const handleCreateRating = () => {
    if (!validate(validationRules)) return;

    const newRating: RatingItem = {
      id: (ratings.length + 1).toString(),
      name: formData.name,
      rating: Number(formData.rating),
      color: formData.color
    };

    setRatings([...ratings, newRating]);
    showSuccess('Rating created successfully');
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
            rating: Number(formData.rating),
            color: formData.color
          }
        : rating
    );

    setRatings(updatedRatings);
    showSuccess('Rating updated successfully');
    setIsEditModalOpen(false);
    setSelectedRating(null);
    resetForm();
  };

  const handleDeleteRating = () => {
    if (!selectedRating) return;

    const updatedRatings = ratings.filter(rating => rating.id !== selectedRating.id);
    setRatings(updatedRatings);
    showSuccess('Rating deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedRating(null);
  };

  const openEditModal = (rating: RatingItem) => {
    setSelectedRating(rating);
    setFormData({
      name: rating.name,
      rating: rating.rating.toString(),
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

      <Input
        label="Rating Value (1-5)"
        name="rating"
        type="number"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        error={validationRules.rating(formData.rating)}
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
          Create Rating Category
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating Color</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ratings.map((rating) => (
              <tr key={rating.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
        title="Create Control Rating"
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
        title="Edit Control Rating"
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
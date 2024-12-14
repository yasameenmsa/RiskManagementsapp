import { useState } from 'react';
import { PenSquare, Trash2, Plus } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import FormModal from './modals/FormModal';
import Button from './common/Button';
import Input from './common/Input';
import ConfirmationDialog from './common/ConfirmationDialog';

interface FrequencyItem {
  id: string;
  name: string;
}

const initialFormState = {
  name: ''
};

export default function ControlFrequency() {
  const [frequencies, setFrequencies] = useState<FrequencyItem[]>([
    { id: '1', name: 'Daily' },
    { id: '2', name: 'Weekly' },
    { id: '3', name: 'Monthly' },
    { id: '4', name: 'Quarterly' },
    { id: '5', name: 'Annually' }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyItem | null>(null);
  const { showSuccess, showError } = useToast();

  const {
    formData,
    handleChange,
    resetForm,
    errors,
    validate
  } = useForm(initialFormState);

  const validationRules = {
    name: (value: string) => !value ? 'Frequency name is required' : undefined
  };

  const handleCreateFrequency = () => {
    if (!validate(validationRules)) return;

    const newFrequency: FrequencyItem = {
      id: (frequencies.length + 1).toString(),
      name: formData.name
    };

    setFrequencies([...frequencies, newFrequency]);
    showSuccess('Control frequency created successfully');
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditFrequency = () => {
    if (!selectedFrequency || !validate(validationRules)) return;

    const updatedFrequencies = frequencies.map(frequency =>
      frequency.id === selectedFrequency.id
        ? { ...frequency, name: formData.name }
        : frequency
    );

    setFrequencies(updatedFrequencies);
    showSuccess('Control frequency updated successfully');
    setIsEditModalOpen(false);
    setSelectedFrequency(null);
    resetForm();
  };

  const handleDeleteFrequency = () => {
    if (!selectedFrequency) return;

    const updatedFrequencies = frequencies.filter(
      frequency => frequency.id !== selectedFrequency.id
    );
    setFrequencies(updatedFrequencies);
    showSuccess('Control frequency deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedFrequency(null);
  };

  const openEditModal = (frequency: FrequencyItem) => {
    setSelectedFrequency(frequency);
    formData.name = frequency.name;
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Frequency Category
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {frequencies.map((frequency) => (
              <tr key={frequency.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {frequency.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(frequency)}
                    className="mr-2"
                  >
                    <PenSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedFrequency(frequency);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
        title="Create Control Frequency"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateFrequency(); }}>
          <div className="space-y-4">
            <Input
              label="Frequency Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Frequency
              </Button>
            </div>
          </div>
        </form>
      </FormModal>

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Control Frequency"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleEditFrequency(); }}>
          <div className="space-y-4">
            <Input
              label="Frequency Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </FormModal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Control Frequency"
        message={`Are you sure you want to delete "${selectedFrequency?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteFrequency}
        onCancel={() => setIsDeleteDialogOpen(false)}
        variant="danger"
      />
    </div>
  );
}
import { useState } from 'react';
import { PenSquare, Trash2, Plus } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import FormModal from './modals/FormModal';
import Button from './common/Button';
import Input from './common/Input';
import ConfirmationDialog from './common/ConfirmationDialog';

interface ControlCategoryItem {
  id: string;
  name: string;
}

const initialFormState = {
  name: ''
};

export default function ControlCategory() {
  const [categories, setCategories] = useState<ControlCategoryItem[]>([
    { id: '1', name: 'Corrective' },
    { id: '2', name: 'Detective' },
    { id: '3', name: 'Preventive' }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ControlCategoryItem | null>(null);
  const { showSuccess, showError } = useToast();

  const {
    formData,
    handleChange,
    resetForm,
    errors,
    validate
  } = useForm(initialFormState);

  const validationRules = {
    name: (value: string) => !value ? 'Category name is required' : undefined
  };

  const handleCreateCategory = () => {
    if (!validate(validationRules)) return;

    const newCategory: ControlCategoryItem = {
      id: (categories.length + 1).toString(),
      name: formData.name
    };

    setCategories([...categories, newCategory]);
    showSuccess('Control category created successfully');
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditCategory = () => {
    if (!selectedCategory || !validate(validationRules)) return;

    const updatedCategories = categories.map(category =>
      category.id === selectedCategory.id
        ? { ...category, name: formData.name }
        : category
    );

    setCategories(updatedCategories);
    showSuccess('Control category updated successfully');
    setIsEditModalOpen(false);
    setSelectedCategory(null);
    resetForm();
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.filter(
      category => category.id !== selectedCategory.id
    );
    setCategories(updatedCategories);
    showSuccess('Control category deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const openEditModal = (category: ControlCategoryItem) => {
    setSelectedCategory(category);
    formData.name = category.name;
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
          Create Control Category
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(category)}
                    className="mr-2"
                  >
                    <PenSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category);
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
        title="Create Control Category"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateCategory(); }}>
          <div className="space-y-4">
            <Input
              label="Category Name"
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
                Create Category
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
        title="Edit Control Category"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleEditCategory(); }}>
          <div className="space-y-4">
            <Input
              label="Category Name"
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
        title="Delete Control Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteCategory}
        onCancel={() => setIsDeleteDialogOpen(false)}
        variant="danger"
      />
    </div>
  );
}
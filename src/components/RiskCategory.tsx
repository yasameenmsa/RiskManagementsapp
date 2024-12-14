import { useState } from 'react';
import { PenSquare, Trash2, Plus, Search } from 'lucide-react';
import { RiskCategoryItem } from '../types/risk';
import ImageUpload from './common/ImageUpload';
import ConfirmationDialog from './common/ConfirmationDialog';
import CreateModal from './modals/CreateModal';
import { format } from 'date-fns';

export default function RiskCategory() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RiskCategoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [risks, setRisks] = useState<RiskCategoryItem[]>([
    {
      id: '1',
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      category: "Finance Operations",
      description: "Risks related to financial operations and processes",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-10"
    },
    {
      id: '2',
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
      category: "Financial Planning & Analysis",
      description: "Strategic financial planning and analysis risks",
      createdAt: "2024-03-02",
      updatedAt: "2024-03-09"
    },
    {
      id: '3',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "Marketing",
      description: "Marketing strategy and execution risks",
      createdAt: "2024-03-03",
      updatedAt: "2024-03-08"
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    category: '',
    description: '',
    image: ''
  });

  const filteredRisks = risks.filter(risk =>
    risk.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    risk.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = () => {
    const now = new Date();
    const newRisk: RiskCategoryItem = {
      id: (risks.length + 1).toString(),
      ...newCategory,
      createdAt: format(now, 'yyyy-MM-dd'),
      updatedAt: format(now, 'yyyy-MM-dd')
    };
    setRisks([...risks, newRisk]);
    setIsCreateModalOpen(false);
    setNewCategory({ category: '', description: '', image: '' });
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;
    
    const updatedRisks = risks.map(risk => {
      if (risk.id === selectedCategory.id) {
        return {
          ...selectedCategory,
          updatedAt: format(new Date(), 'yyyy-MM-dd')
        };
      }
      return risk;
    });
    
    setRisks(updatedRisks);
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    
    const updatedRisks = risks.filter(risk => risk.id !== selectedCategory.id);
    setRisks(updatedRisks);
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const openEditModal = (risk: RiskCategoryItem) => {
    setSelectedCategory(risk);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-xs">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Risk Category
        </button>
      </div>

      {/* Risk Categories Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRisks.map((risk) => (
              <tr key={risk.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={risk.image} 
                    alt={risk.category}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{risk.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{risk.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{risk.updatedAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(risk)}
                    className="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    <PenSquare className="h-5 w-5 inline" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCategory(risk);
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
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Risk Category"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateCategory(); }} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="category"
              value={newCategory.category}
              onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Image</label>
            <ImageUpload
              onImageChange={(url) => setNewCategory({ ...newCategory, image: url || '' })}
              folder="risk-categories"
            />
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Create Category
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </CreateModal>

      {/* Edit Modal */}
      <CreateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Risk Category"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleEditCategory(); }} className="space-y-4">
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="edit-category"
              value={selectedCategory?.category || ''}
              onChange={(e) => setSelectedCategory(prev => prev ? { ...prev, category: e.target.value } : null)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="edit-description"
              value={selectedCategory?.description || ''}
              onChange={(e) => setSelectedCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Image</label>
            <ImageUpload
              onImageChange={(url) => setSelectedCategory(prev => prev ? { ...prev, image: url || prev.image } : null)}
              folder="risk-categories"
              currentImage={selectedCategory?.image}
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
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </CreateModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Risk Category"
        message={`Are you sure you want to delete "${selectedCategory?.category}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteCategory}
        onCancel={() => setIsDeleteDialogOpen(false)}
        variant="danger"
      />
    </div>
  );
}
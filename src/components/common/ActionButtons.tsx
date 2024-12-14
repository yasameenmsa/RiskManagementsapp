import { PenSquare, Trash2 } from 'lucide-react';
import IconButton from './IconButton';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-2">
      <IconButton onClick={onEdit} variant="primary">
        <PenSquare className="h-4 w-4" />
      </IconButton>
      <IconButton onClick={onDelete} variant="danger">
        <Trash2 className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
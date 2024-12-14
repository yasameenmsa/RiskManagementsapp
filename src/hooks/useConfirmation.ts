import { useState, useCallback } from 'react';

interface UseConfirmationReturn {
  isOpen: boolean;
  confirm: () => Promise<boolean>;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function useConfirmation(): UseConfirmationReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const confirm = useCallback(() => {
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolver?.(true);
    setIsOpen(false);
  }, [resolver]);

  const handleCancel = useCallback(() => {
    resolver?.(false);
    setIsOpen(false);
  }, [resolver]);

  return { isOpen, confirm, handleConfirm, handleCancel };
}
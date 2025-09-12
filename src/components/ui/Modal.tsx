import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  size?: 'lg' | 'md' | 'sm';
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children, size = 'lg' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const sizeStyles: Record<string, string> = {
    lg: 'max-w-lg',
    md: 'max-w-md',
    sm: 'max-w-sm',
  };
  const modalRoot = document.getElementById('modal-winner');
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeStyles[size]} min-h-20 overflow-hidden transition-all duration-300`}
      >
        <div className="p-6 overflow-y-auto max-h-[60vh] text-center">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

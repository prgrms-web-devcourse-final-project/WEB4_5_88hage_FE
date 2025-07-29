import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-gray-6 w-full max-w-sm rounded-lg px-8 py-5 text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="h2 mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-5 hover:bg-gray-4 rounded px-4 py-2"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

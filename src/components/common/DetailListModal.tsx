import React from 'react';
import { LucideX } from 'lucide-react';

interface DetailListModalProps {
  title: string;
  data: any[];
  onClose: () => void;
  renderItem: (item: any, index: number) => React.ReactNode;
}

const DetailListModal: React.FC<DetailListModalProps> = ({
  title,
  data,
  onClose,
  renderItem,
}) => {
  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-8 flex max-h-[80vh] w-11/12 max-w-[1000px] flex-col rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-gray-disabled mb-4 flex items-center justify-between border-b pb-3">
          <h2 className="h2 font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-disabled hover:text-white"
          >
            <LucideX size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          {data.length > 0 ? (
            <div className="text-gray-1 flex flex-col gap-3">
              {data.map((item, index) => renderItem(item, index))}
            </div>
          ) : (
            <p className="text-gray-400">데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailListModal;

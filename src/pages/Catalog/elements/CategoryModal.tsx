import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalBottomSheet } from '../../../components/ui/GlobalBottomSheet/GlobalBottomSheet';

interface Props {
  isOpen: boolean;
  category: any | null;
  treeData: any[];
  ktype: number;
  vehicle: any;
  onClose: () => void;
  onSelectLeaf: (params: { ktype: number; categoryId: number }) => void;
}

const CategoryModal = ({
  isOpen,
  category,
  treeData,
  ktype,
  vehicle,
  onClose,
}: Props) => {
  const navigate = useNavigate();

  if (!category) return null;

  const children = treeData.filter((i: any) => i.parentId === category.id);

  return (
    <GlobalBottomSheet isOpen={isOpen} onClose={onClose}>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-lg'>{category.name}</h3>
        <button
          onClick={onClose}
          className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8]'
        >
          <X size={16} />
        </button>
      </div>

      <div className='flex flex-col gap-3'>
        {children.map((child: any) => {
          const isLeaf = child.children === 0;

          return (
            <button
              key={child.id}
              onClick={() => {
                navigate('/confirmation', {
                  state: {
                    ktype,
                    node: child,
                    vehicle,
                    treeData,
                  },
                });
              }}
              className='p-3 bg-[#FDFDFD] rounded-xl text-left'
            >
              <div className='flex justify-between items-center'>
                <span>{child.name}</span>

                {!isLeaf && (
                  <span className='text-xs text-[#9A9A9A]'>
                    {child.children} разделов
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </GlobalBottomSheet>
  );
};

export default CategoryModal;

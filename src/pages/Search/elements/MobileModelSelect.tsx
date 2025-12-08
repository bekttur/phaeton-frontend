interface MobileModelSelectProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: {
    brand: string;
    model: string;
    year: string;
    modification: string;
  }) => void;
}

const MobileModelSelect = ({ isOpen, onClose, onConfirm }: MobileModelSelectProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-[20px] p-4">
        <div className="text-center font-semibold text-lg mb-4">Выбор автомобиля</div>
        <button
          onClick={() => {
            onConfirm({
              brand: 'Toyota',
              model: 'Camry',
              year: '2020',
              modification: 'V6',
            });
          }}
          className="w-full bg-[#34C759] text-white rounded-[10px] py-3 mb-2"
        >
          Выбрать Toyota Camry
        </button>
        <button
          onClick={onClose}
          className="w-full bg-[#F5F5F5] text-black rounded-[10px] py-3"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default MobileModelSelect;

interface TabBarProps {
  activeTab: 'status' | 'services';
  onTabChange: (tab: 'status' | 'services') => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-3 px-4 mb-4 pt-1">
      <button
        onClick={() => onTabChange('status')}
        className={`flex-1 py-2.5 rounded-2xl font-medium transition-colors ${
          activeTab === 'status'
            ? 'bg-[#4EBC73] text-white'
            : 'bg-[#EAECED] text-[#636366]'
        }`}
      >
        Состояние
      </button>
      <button
        onClick={() => onTabChange('services')}
        className={`flex-1 py-2.5 rounded-2xl font-medium transition-colors ${
          activeTab === 'services'
            ? 'bg-[#4EBC73] text-white'
            : 'bg-[#EAECED] text-[#636366]'
        }`}
      >
        Сервисы
      </button>
    </div>
  );
}

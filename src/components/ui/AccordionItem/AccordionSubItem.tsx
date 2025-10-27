interface AccordionSubItemProps {
  title: string;
  onClick?: () => void;
}

export const AccordionSubItem = ({ title, onClick }: AccordionSubItemProps) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 transition-colors border-b border-[#E9EBEE] last:border-b-0 cursor-pointer hover:bg-gray-50"
    >
      <span className="text-base text-[#565656]">{title}</span>
    </div>
  );
};

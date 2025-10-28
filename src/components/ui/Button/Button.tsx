import type { ReactNode } from 'react';


interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className = '', onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 border border-1 border-[#DCE0E5] bg-[#4EBC73] text-[#fff] hover:bg-[#43a765] transition font-medium ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

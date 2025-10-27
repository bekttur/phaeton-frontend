import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // если используешь Next.js — замени на next/link

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-gray-500 text-sm pt-3">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="font-semibold text-gray-700 hover:underline"
              >
                {item.title}
              </Link>
            ) : (
              <span
                className={`${
                  isLast ? 'text-[#909792] font-medium' : 'text-[#56625A] font-semibold'
                }`}
              >
                {item.title}
              </span>
            )}
            {!isLast && <ChevronRight className="mx-2 text-[#56625A]" size={14} />}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;

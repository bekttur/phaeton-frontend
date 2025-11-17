import { ShoppingCart } from 'lucide-react';

export default function FixedCartButton() {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-transparent'>
      <button className='w-full bg-[#4EBC73] hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors'>
        <ShoppingCart className='w-5 h-5' />В корзину
      </button>
    </div>
  );
}

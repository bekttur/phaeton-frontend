
export default function FixedCartButton() {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-transparent'>
      <button className='w-full bg-[#4EBC73] hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors'>
		<img  src={`${import.meta.env.BASE_URL}icon/shopping-cart-white.svg`} alt="" />
        Добавить в корзину
      </button>
    </div>
  );
}

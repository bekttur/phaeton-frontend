import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Button from '../../../components/ui/Button/Button';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  isFeatured?: boolean;
  installment?: string;
  cashback: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    discount: 10,
    isFeatured: true,
    installment: '0 - 0 - 24',
    cashback: 95000,
  },
  {
    id: 2,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    cashback: 95000,
  },
  {
    id: 3,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    isFeatured: true,
    cashback: 95000,
  },
  {
    id: 4,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    installment: '0 - 0 - 24',
    cashback: 95000,
  },
  {
    id: 5,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    installment: '0 - 0 - 24',
    cashback: 95000,
  },
  {
    id: 6,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    installment: '0 - 0 - 24',
    cashback: 95000,
  },
  {
    id: 7,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    cashback: 95000,
  },
  {
    id: 8,
    name: 'Название товара',
    description: 'с запасом на 2 строки',
    price: 32000,
    rating: 4.5,
    reviews: 132,
    image: 'product/first-product.png',
    cashback: 95000,
  },
];

const PopularProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className='hidden lg:block lg:px-32'>
        <div className='w-full h-fit flex flex-col bg-white gap-2 lg:gap-6 py-4 rounded-[20px]'>
          <div className='w-full flex items-center justify-between px-6'>
            <span className='block text-lg font-semibold'>
              Популярные товары
            </span>
            <p className='text-sm text-[#4EBC73] font-semibold cursor-pointer'>
              Показать все
            </p>
          </div>
          <div className='w-full flex gap-4 overflow-x-auto scroll-hidden py-2 pl-6'>
            {products.map((product) => (
              <Link
                to={'/product/1'}
                key={product.id}
                className='w-[236px] bg-white flex-shrink-0 rounded-xl overflow-hidden border border-[#EAECED]'
              >
                <div className='relative bg-[#E9F0F3]'>
                  {product.installment && (
                    <span className='absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-white text-xs font-medium rounded-lg'>
                      0 - 0 - 24
                    </span>
                  )}

                  {/* ❤️ сердечко (кликабельное) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // ❗ отменяем переход по Link
                      e.stopPropagation(); // ❗ останавливаем всплытие
                      toggleFavorite(product.id);
                    }}
                    className={`absolute top-2 right-2 p-1 ${
                      favorites.includes(product.id)
                        ? 'bg-[#FFFFFF]'
                        : 'bg-[#D8D8D899]'
                    }  rounded-lg`}
                  >
                    <Heart
                      className={`w-5 h-5 transition ${
                        favorites.includes(product.id)
                          ? 'text-[#5FCD84] fill-[#5FCD84]'
                          : 'text-[#83838399]'
                      }`}
                    />
                  </button>

                  <div className='flex items-center justify-center'>
                    <img
                      src={`${import.meta.env.BASE_URL}${product.image}`}
                      alt={product.name}
                      className='w-[70%] h-40 object-contain'
                    />
                  </div>

                  {product.installment && (
                    <span className='absolute bottom-2 left-2 px-2 py-0.5 bg-[#4EBC73] text-white text-xs font-medium rounded-lg'>
                      -10%
                    </span>
                  )}
                </div>

                <div className='p-2'>
                  <span className='text-sm font-medium text-[#3E3E3E] mb-1'>
                    {product.name}
                  </span>
                  <h3 className='text-sm font-medium text-[#3E3E3E] mb-1'>
                    {product.description}
                  </h3>

                  <div className='flex items-center gap-1 mb-2'>
                    <span className='text-sm font-semibold'>
                      {product.rating}
                    </span>
                    <div className='text-xs flex text-[#4EBC73]'>★★★★★</div>
                    <span className='text-xs text-[#6F7C8E]'>
                      ({product.reviews} отзыва)
                    </span>
                  </div>

                  <p className='text-lg font-bold text-[#3E3E3E] mb-2'>
                    {product.price.toLocaleString('ru-KZ')} ₸
                  </p>

                  <button className='w-fit bg-[#E3F2F8] text-white py-1 px-1.5 rounded-[10px] mb-2'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-sm font-semibold '>
                      {product.cashback.toLocaleString('ru-KZ')} ₸ c кэшбеком
                    </span>
                  </button>

                  <Button className='w-full rounded-[10px] border-none'>
                    В Корзину
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='lg:hidden block w-full h-full bg-gray-50 px-4'>

        <div>
          <div className='grid grid-cols-2 gap-3 pb-4'>
            {!!products &&
              products.map((product) => (
                // ProductsPage или там, где Link на ProductPage
                <div
                  className='bg-white rounded-xl overflow-hidden shadow-sm'
                >
                  <div className='relative bg-[#E9F0F3]'>
                    {/* сердечко */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute top-2 right-2 p-1 ${
                        favorites.includes(product.id)
                          ? 'bg-[#FFFFFF]'
                          : 'bg-[#D8D8D899]'
                      }  rounded-lg`}
                    >
                      <Heart
                        className={`w-5 h-5 transition ${
                          favorites.includes(product.id)
                            ? 'text-[#5FCD84] fill-[#5FCD84]'
                            : 'text-[#83838399]'
                        }`}
                      />
                    </button>
                    <div className='flex items-center justify-center'>
                      <img
                        // src={`${import.meta.env.BASE_URL}${product.image}`}
                        src={`${
                          import.meta.env.BASE_URL
                        }product/first-product.png`}
                        alt={product.name}
                        className='w-[70%] h-40 object-contain'
                      />
                    </div>
                  </div>

                  <div className='p-2'>
                    <span className='text-sm font-medium text-[#3E3E3E] mb-1'>
                      {product.name}
                      {product.description}
                    </span>

                    <div className='flex items-center gap-1 mb-2'>
                      <span className='text-sm font-semibold'>
                        {product.rating}
                      </span>
                      <div className='text-xs flex text-[#4EBC73]'>★★★★★</div>
                      <span className='text-xs text-[#6F7C8E]'>
                        ({product.reviews} отзыва)
                      </span>
                    </div>

                    <p className='text-lg font-bold text-[#3E3E3E] mb-2'>
                      {product.price.toLocaleString('ru-KZ')} ₸
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProducts;

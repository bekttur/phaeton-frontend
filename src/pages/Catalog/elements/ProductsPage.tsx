import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IProductsPage {
  items?: any[];
  article?: string;
  brand?: string;
}

function ProductsPage({ items, article, brand }: IProductsPage) {
  // const carName = 'Toyota 4Runner / Hilux';

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className='lg:hidden w-full h-full bg-gray-50'>
      <div>
        <div className='grid grid-cols-2 gap-3 pb-4'>
          {!!items &&
            items.map((product) => (
              <Link
                to={`/product/${product.ItemId}`}
                key={product.ItemId}
                state={{
                  product,
                  from: {
                    article,
                    brand,
                  },
                }}
                className='bg-white rounded-xl overflow-hidden shadow-sm'
              >
                <div className='relative bg-[#E9F0F3]'>
                  {/* сердечко */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(product.ItemId);
                    }}
                    className={`absolute top-2 right-2 p-1 ${
                      favorites.includes(product.ItemId)
                        ? 'bg-[#FFFFFF]'
                        : 'bg-[#D8D8D899]'
                    }  rounded-lg`}
                  >
                    <Heart
                      className={`w-5 h-5 transition ${
                        favorites.includes(product.ItemId)
                          ? 'text-[#5FCD84] fill-[#5FCD84]'
                          : 'text-[#83838399]'
                      }`}
                    />
                  </button>
                  <div className='flex items-center justify-center'>
                    <img
                      // src={`${import.meta.env.BASE_URL}${product.image}`}
                      src={product.PhotoItem}
                      alt={product.Name}
                      className='w-[70%] h-40 object-contain'
                    />
                  </div>
                </div>

                <div className='p-2'>
                  <span className='text-sm font-medium text-[#3E3E3E] mb-1 line-clamp-2'>
                    {product.Name}
                  </span>

                  <div className='flex items-center gap-1 mb-2'>
                    <span className='text-sm font-semibold'>
                      {/* {product.rating} */}4
                    </span>
                    <div className='text-xs flex text-[#4EBC73]'>★★★★★</div>
                    <span className='text-xs text-[#6F7C8E]'>
                      {/* ({product.reviews} отзыва) */}
                      (134 отзыва)
                    </span>
                  </div>

                  <p className='text-lg font-bold text-[#3E3E3E] mb-2'>
                    {product.Price.toLocaleString('ru-KZ')} ₸
                  </p>

                  <div className='w-fit h-fit px-2 py-1 bg-[#E3F2F8] rounded-[10px]'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-sm font-semibold'>
                      18 924 ₸ c кэшбеком
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

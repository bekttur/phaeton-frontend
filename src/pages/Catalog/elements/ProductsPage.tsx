import { useState } from 'react';
import { Heart } from 'lucide-react';

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

function ProductsPage() {
  const carName = 'Toyota 4Runner / Hilux';

  // ⭐ избранные товары
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Название товара',
      description: 'с запасом на 2 строки',
      price: 32000,
      rating: 4.5,
      reviews: 132,
      image:
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop',
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
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      cashback: 95000,
    },
    {
      id: 3,
      name: 'Название товара',
      description: 'с запасом на 2 строки',
      price: 32000,
      rating: 4.5,
      reviews: 132,
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
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
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      installment: '0 - 0 - 24',
      cashback: 95000,
    },
  ];

  return (
    <div className="lg:hidden w-full h-full bg-gray-50 px-2">
      {/* <Breadcrumb
        items={[
          { title: 'Главная', href: '/' },
          { title: 'Каталог товаров', href: '/catalog' },
          { title: 'Шины', href: '/2' },
          { title: 'Шины для легковых авто' },
        ]}
      /> */}

      {/* <div className="py-4">
        <h1 className="text-xl font-bold text-[#3E3E3E]">
          Шины для легковых авто
        </h1>
        <p className="text-sm text-[#3E3E3E] font-semibold">120 товаров</p>
      </div> */}

      {/* <div className="py-4 flex items-center justify-between">
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-[#565656] font-semibold">
          Сначала недорогие
          <ChevronDown className="w-4 h-4" color="#565656" />
        </button>
        <button className="border border-gray-300 px-1.5 py-1.5 rounded-lg text-sm font-medium text-[#565656]">Фильтры</button>
      </div> */}

      <div>
        {/* <div className="bg-[#4E9DBC] rounded-2xl p-4 mb-4 shadow-md">
          <div className="flex items-start gap-3">
            <img
              src={`${import.meta.env.BASE_URL}images/911.png`}
              alt="Car top view"
              className="w-20 h-full rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-emerald-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">{carName}</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Мы определили вашу комплектацию — теперь показываем только совместимые товары
              </p>
              <div className="w-full flex justify-end">
                <button className="bg-white text-[#4A5E46] px-2 py-0.5 rounded-lg text-sm font-medium">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-3 pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <div className="relative">
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}

                {/* ❤️ сердечко (кликабельное) */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-2 right-2 p-1 ${ favorites.includes(product.id)
                        ? 'bg-[#FFFFFF]'
                        : 'bg-[#D8D8D899]'}  rounded-lg`}
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      favorites.includes(product.id)
                        ? 'text-[#5FCD84] fill-[#5FCD84]'
                        : 'text-[#83838399]'
                    }`}
                  />
                </button>

                {product.isFeatured && (
                  <span
                    className={`absolute ${
                      product.discount ? 'top-10' : 'top-2'
                    } left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded`}
                  >
                    Товар месяца
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                {product.installment && (
                  <span className="absolute bottom-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.installment}
                  </span>
                )}
              </div>

              <div className="p-2">
                <h3 className="text-sm font-medium text-[#3E3E3E] mb-1">
                  {product.name}
                </h3>
                <h3 className="text-sm font-medium text-[#3E3E3E] mb-1">
                  {product.description}
                </h3>

                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <div className="text-xs flex text-[#4EBC73]">★★★★★</div>
                  <span className="text-xs text-[#6F7C8E]">
                    ({product.reviews} отзыва)
                  </span>
                </div>

                <p className="text-lg font-bold text-[#3E3E3E] mb-2">
                  {product.price.toLocaleString('ru-KZ')} ₸
                </p>

                <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-medium py-2 rounded-lg">
                  Кэшбэк до {product.cashback.toLocaleString('ru-KZ')} ₸
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
